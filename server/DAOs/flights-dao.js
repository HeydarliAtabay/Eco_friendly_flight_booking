"use strict";
const casual = require("casual");
const db = require("../db");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt");

// get all users

// getting user by id

exports.getFlightsByDateAndAirpot = (body) => {
  return new Promise((resolve, reject) => {
    const sqlForTwoWayTickets =
      "SELECT * FROM flights WHERE departure_date=? AND departure_airport=? AND arrival_airport=?";

    const sqlForOneWayTickets =
      "SELECT * FROM flights WHERE departure_date=? AND departure_airport=? AND arrival_airport=?";

    const sqlForGettingAirportInfo = "SELECT * FROM airports WHERE code=?";

    const getAirportInfo = (airportCode) => {
      return new Promise((resolve, reject) => {
        db.query(sqlForGettingAirportInfo, [airportCode], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };

    Promise.all([
      getAirportInfo(body.departure_airport),
      getAirportInfo(body.arrival_airport),
    ])
      .then(([departureAirport, arrivalAirport]) => {
        console.log(arrivalAirport.id);
        console.log(departureAirport.id);
        console.log(body.arrival_date);
        console.log(body.departure_date);

        if (body.arrival_date !== undefined) {
          const departurePromise = new Promise((resolve, reject) => {
            db.query(
              sqlForTwoWayTickets,
              [body.departure_date, departureAirport.id, arrivalAirport.id],
              (err, rows) => {
                if (err) reject(err);
                else if (rows.length === 0)
                  resolve({ error: "Flight not found" });
                else resolve(rows);
              }
            );
          });
          const arrivalPromise = new Promise((resolve, reject) => {
            db.query(
              sqlForTwoWayTickets,
              [body.arrival_date, arrivalAirport.id, departureAirport.id],
              (err, rows) => {
                if (err) reject(err);
                else if (rows.length === 0)
                  resolve({ error: "Flight not found" });
                else resolve(rows);
              }
            );
          });

          Promise.all([departurePromise, arrivalPromise])
            .then(([departureRows, arrivalRows]) => {
              // Add additional information to arrivalRows and departureRows
              const augmentedDepartureRows = departureRows.map((row) => {
                return {
                  ...row,
                  departure_airport_name: departureAirport.name,
                  departure_airport_code: departureAirport.code,
                  departure_airport_country: departureAirport.country,
                  departure_airport_city: departureAirport.city,
                  arrival_airport_name: arrivalAirport.name,
                  arrival_airport_code: arrivalAirport.code,
                  arrival_airport_country: arrivalAirport.country,
                  arrival_airport_city: arrivalAirport.city,
                };
              });
              const augmentedArrivalRows = arrivalRows.map((row) => {
                return {
                  ...row,
                  departure_airport_name: arrivalAirport.name,
                  departure_airport_code: arrivalAirport.code,
                  departure_airport_country: arrivalAirport.country,
                  departure_airport_city: arrivalAirport.city,
                  arrival_airport_name: departureAirport.name,
                  arrival_airport_code: departureAirport.code,
                  arrival_airport_country: departureAirport.country,
                  arrival_airport_city: departureAirport.city,
                };
              });

              resolve([augmentedDepartureRows, augmentedArrivalRows]);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          db.query(
            sqlForOneWayTickets,
            [body.departure_date, departureAirport.id, arrivalAirport.id],
            (err, rows) => {
              if (err) reject(err);
              else if (rows.length === 0)
                resolve({ error: "Flight not found" });
              else {
                resolve(rows);
              }
            }
          );
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// getting user

exports.createFlight = (flight) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO flights(departure_airport, arrival_airport, departure_date, departure_time," +
      "arrival_date,arrival_time,econom_price, business_price, first_class_price, airline,flight_number )" +
      "VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [
        flight.departure_airport,
        flight.arrival_airport,
        flight.departure_date,
        flight.departure_time,
        flight.arrival_date,
        flight.arrival_time,
        flight.econom_price,
        flight.business_price,
        flight.first_class_price,
        flight.airline,
        flight.flight_number,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        console.log("succesfully added");
        resolve(this.lastID);
      }
    );
  }).catch((error) => {
    // Handle error
    console.error("Error:", error);
  });
};

const generateRandomAlphaNumeric = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const charactersLength = characters.length;
  const numbersLength = numbers.length;
  for (let i = 0; i < length; i++) {
    if (i < 2)
      result += characters
        .charAt(Math.floor(Math.random() * charactersLength))
        .toUpperCase();
    else result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  return result;
};

const generateRandomTime = () => {
  const maxDepartureHour = 20; 
  const maxDifference = 4; 

  const departureHour = Math.floor(Math.random() * (maxDepartureHour + 1));
  const departureMinute = Math.floor(Math.random() * 60);
  const departureTime = `${departureHour
    .toString()
    .padStart(2, "0")}:${departureMinute.toString().padStart(2, "0")}`;

  let arrivalHour, arrivalMinute, arrivalTime;
  arrivalHour=casual.integer(departureHour+1, departureHour+3);
  arrivalMinute=casual.integer(0, 59);
  arrivalTime = `${arrivalHour.toString().padStart(2, "0")}:${arrivalMinute
    .toString()
    .padStart(2, "0")}`;

  return { departureTime, arrivalTime };
};
const generateRandomDate = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = end.diff(start, "day");
  const randomDiff = Math.floor(Math.random() * diff);
  const randomDate = start.add(randomDiff, "day");
  return randomDate.format("YYYY-MM-DD");
};
exports.generateFlight = () => {
  const departureAirport = casual.integer(1, 234);
  let arrivalAirport = casual.integer(1, 234);

  while (arrivalAirport === departureAirport) {
    arrivalAirport = casual.integer(1, 234);
  }

  const departureDate = generateRandomDate("2023-05-05", "2023-12-31");
  const arrivalDate = departureDate;

  const { departureTime, arrivalTime } = generateRandomTime();

  const economPrice = casual.integer(20, 120);
  const businessPrice = economPrice + casual.integer(100, 200);
  const firstClassPrice = businessPrice + casual.integer(100, 200);

  const airline = casual.integer(1, 6);
  const flightNumber = generateRandomAlphaNumeric(6);

  return {
    departure_airport: departureAirport,
    arrival_airport: arrivalAirport,
    departure_date: departureDate,
    departure_time: departureTime,
    arrival_date: arrivalDate,
    arrival_time: arrivalTime,
    econom_price: economPrice,
    business_price: businessPrice,
    first_class_price: firstClassPrice,
    airline: airline,
    flight_number: flightNumber,
  };
};

// const generateAndInsertFlights = (number) => {
//   const flights = [];

//   for (let i = 0; i < number; i++) {
//     const flight = generateFlight();
//     flights.push(flight);
//   }
//   const promises = flights.map((flight) => flightsDao.createFlight(flight));
//   Promise.all(promises)
//     .then((ids) => {
//       console.log("Flights inserted:", ids);
//     })
//     .catch((err) => {
//       console.error("Error inserting flights:", err);
//     });
// };
