"use strict";

const db = require("../db");

const bcrypt = require("bcrypt");

// get all users

exports.listAllUsers = () => {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * FROM users ";
    db.all(query_str, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// getting user by id

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.run(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = {
          id: row[0].id,
          username: row[0].email,
          name: row[0].name,
          surname: row[0].surname,
          phone_number: row[0].phone_number,
        };
        resolve(user);
      }
    });
  });
};



// getting user

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.run(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: row[0].id,
          name: row[0].name,
          surname: row[0].surname,
          username: row[0].email,
          phone_number: row[0].phone_number,
        };

        // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
        bcrypt.compare(password, row[0].hashed_password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

exports.updatePersonalInfo = function (body, id) {
  return new Promise((resolve, reject) => {
    // const sql = 'UPDATE tasks SET completed = CASE status WHEN completed=0 THEN 1 WHEN completed=1 THEN 0 END WHERE id = ?';
    const sql =
      "UPDATE users SET name=?, surname=?, phone_number=?  WHERE id=?";
    db.run(sql, [body.name, body.surname, body.phone_number, id], (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.signUp = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users(name, surname, phone_number, email, hashed_password) VALUES(?,?,?,?,?)";

    const password = user.hashed_password;
    const saltRounds = 10;
    let hashedPassword; // Declare the variable outside the promise chain

    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        // Update the value of hashedPassword inside the promise chain
        hashedPassword = hash;

        db.run(
          sql,
          [
            user.name,
            user.surname,
            user.phone_number,
            user.email,
            hashedPassword,
          ],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            console.log(this.lastID);
            resolve(this.lastID);
          }
        );
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  });
};

exports.insertAirports = function (code, name, city, country) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO airports (code, name, city, country) VALUES (?, ?, ?, ?);";
    db.run(sql, [code, name, city, country], (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};
