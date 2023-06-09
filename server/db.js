// const mysql= require("mysql")
// require('dotenv').config();


// const db = mysql.createConnection({
//     host:process.env.DB_HOST,
//     port:"3306",
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE,
// })

// db.connect(err=>{
//     if(err){
//         console.log(err.message)
//         return;
//     }
//     console.log("Database connected")
// })

// module.exports = db;


'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('eco_flight.db', (err) => {
    if (err) throw err;
    else console.log('Succesfully connected to DB')
});

module.exports = db;