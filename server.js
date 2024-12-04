'use strict';

// const constants = require('./constants');
const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql');
const session = require('express-session');
const db = require('./db');
const argon2 = require("argon2");
const path = require('path');


const mysqlStore = require('express-mysql-session')(session);


const PORT = process.env.APP_PORT;
const IN_PROD = process.env.NODE_ENV === 'production'
const TWO_HOURS = 1000 * 60 * 60 * 2
const options = {
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
};

const pool = mysql.createPool(options);

const sessionStore = new mysqlStore(options, pool);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: TWO_HOURS,
        sameSite: true,
        secure: IN_PROD
    }
}))

app.get('/', (req, res) => {
    const { userId } = req.session
    console.log(userId);
    res.sendFile(path.join(__dirname, 'public', 'cover.html'));

})

app.get('/register', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'register.html'));

})

app.post('/register', async (req, res, next) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        let password = req.body.password;

        if (!firstName || !lastName || !email || !password) {
            return res.sendStatus(400);
        }

        try {
            password = await argon2.hash(password);
        } catch (err) {
            console.error('Password hashing error:', err);
            return res.sendStatus(500); // Server error
        }


        const user = await db.insertUser(firstName, lastName, email, password);
        const fetchedUser = await db.getUser(user.insertId);  // Assuming insertId is returned by db.insertUser
        req.session.userId = fetchedUser.id;
        return res.redirect('/home');


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            // Redirect to login with an error message in the query string
            return res.redirect('/login?error=missing_credentials');
        }

        user = await db.getUserByEmail(email);

        if (!user || !(await argon2.verify(user.password, password))) {
            res.redirect('/login?error=invalid_credentials');
        }
        req.session.userId = user.id;;
        return res.redirect('/home');
    } catch (e) {
        console.error('Login Error:', e);
        return res.redirect('/login?error=server_error');
    }
});

app.get('/home', async (req, res) => {
    const { userId } = req.session

    if (!userId) {
        return res.redirect('/login');
    }

    if (userId) {
        try {
            const user = await db.getUser(userId);
            if (!user) {
                return res.sendStatus(404); // User not found, handle error properly
            }
            req.user = user;  // Store user in the request object
            res.sendFile(path.join(__dirname, 'public', 'page1.html'));
        } catch (e) {
            console.log("Error fetching user: ", e);
            res.sendStatus(500);
        }
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }

        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/login')
    })

})

app.listen(PORT, () => { console.log(`Listening at http://localhost:${PORT}`) });