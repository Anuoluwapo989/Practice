const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
 
});
 
 
let db = {};

db.getUser = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM User WHERE id= ?', [id], (error, user)=>{
            if(error){
                return reject(error);
            }
            return resolve(user);
        });
    });
};
 

 
 
 
db.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};
 
 
 
db.insertUser = (firstName, lastName, email, password) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};
 
module.exports = db;
 