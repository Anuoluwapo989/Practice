//OLD LOGIC
// const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     password: process.env.DB_PASS,
//     user: process.env.DB_USER,
//     database: process.env.MYSQL_DB,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT
 
// });
 
 
// let db = {};

// db.getUser = (id) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM User WHERE id= ?', [id], (error, user)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(user);
//         });
//     });
// };
 

 
 
 
// db.getUserByEmail = (email) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(users[0]);
//         });
//     });
// };
 
 
 
// db.insertUser = (firstName, lastName, email, password) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result.insertId);
//         });
//     });
// };
 
// module.exports = db;

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); // 1. Import bcrypt

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

let db = {};

db.getUser = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE id = ?', [id]);
        return rows[0]; 
    } catch (error) {
        throw error; 
    }
};

db.getUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// 2. Update insertUser to hash the password before saving
db.insertUser = async (firstName, lastName, email, plainTextPassword) => {
    try {
        // The "salt rounds" determine how much time is spent calculating the hash. 
        // 10 is the industry standard sweet spot between high security and fast server response.
        const saltRounds = 10;
        
        // Scramble the password
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

        // Save the HASHED password to the database, not the plain text one
        const [result] = await pool.query(
            'INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', 
            [firstName, lastName, email, hashedPassword]
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
};


if (response.ok) { 
    window.location.href = '/page1.html';
} else if (response.status === 401) {
    showError("Wrong email or password");
}

module.exports = db;