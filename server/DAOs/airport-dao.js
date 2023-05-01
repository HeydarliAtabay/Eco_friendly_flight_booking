"use strict";

const db = require("../db");

// get all airports

exports.listAllAirports = () => {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * FROM airports ";
    db.query(query_str, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};
