"use strict";

const db = require("../db");

const bcrypt = require("bcrypt");

// get all users

exports.listAllUsers = () => {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * FROM users ";
    db.query(query_str, function (err, rows) {
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
    db.query(sql, [id], (err, row) => {
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
  console.log(email + " " + password);
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, row) => {
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
          console.log(result);
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
    db.query(sql, [body.name, body.surname, body.phone_number, id], (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};
