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

    const sqlForGetAirlineInfo = "SELECT * FROM airlines WHERE id=?";

    const getAirportInfo = (airportCode) => {
      return new Promise((resolve, reject) => {
        db.query(sqlForGettingAirportInfo, [airportCode], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };
    const getAirlineInfo = (airlineId) => {
      return new Promise((resolve, reject) => {
        db.query(sqlForGetAirlineInfo, [airlineId], (err, row) => {
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
        if (body.arrival_date !== undefined) {
          const departurePromise = new Promise((resolve, reject) => {
            db.query(
              sqlForTwoWayTickets,
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
              let airlineid;
              if (!Array.isArray(departureRows)) {
                departureRows = [];
              }
              if (!Array.isArray(arrivalRows)) {
                arrivalRows = [];
              }
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
              const result = {
                Departure: augmentedDepartureRows,
                Return: augmentedArrivalRows,
              };

              resolve(result);
              // resolve([augmentedDepartureRows, augmentedArrivalRows]);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          const oneWayPromise = new Promise((resolve, reject) => {
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
          });

          Promise.all([oneWayPromise])
            .then(([oneWayRows]) => {
              if (!Array.isArray(oneWayRows)) {
                oneWayRows = [];
              }
              const augmentedOneWayFLights = oneWayRows.map((row) => {
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
              const result = {
                Departure: augmentedOneWayFLights,
              };

              resolve(result);
              // resolve([augmentedDepartureRows, augmentedArrivalRows]);
            })
            .catch((err) => {
              reject(err);
            });
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

exports.bookFlight = (flight) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO booked_flights(user_id, flight_id, seat, payment_status," +
      "checkin_status,selected_class,paid_price,baggage)" +
      "VALUES(?,?,?,?,?,?,?,?)";
    const baggageObject =
      flight.selected_class === "ECONOM"
        ? [
            { type: "Checkin", kg: 23, amount: 1 },
            { type: "Hand", kg: 10, amount: 1 },
          ]
        : flight.selected_class === "BUSINESS"
        ? [
            { type: "Checkin", kg: 32, amount: 1 },
            { type: "Hand", kg: 10, amount: 1 },
          ]
        : [
            { type: "Checkin", kg: 32, amount: 2 },
            { type: "Hand", kg: 10, amount: 1 },
          ];
    const baggageJson = JSON.stringify(baggageObject);
    db.query(
      sql,
      [
        flight.user_id,
        flight.flight_id,
        flight.seat,
        flight.payment_status,
        flight.checkin_status,
        flight.selected_class,
        flight.paid_price,
        baggageJson,
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

exports.getBookedFlightsOfUser = (user) => {
  return new Promise((resolve, reject) => {
    const sqlForGettingBookedFlightsOfUser =
      "SELECT * FROM booked_flights WHERE user_id=?";

    const sqlForGettingFlightInfo = "SELECT * FROM flights WHERE id=?";

    const sqlForGettingAirportInfo = "SELECT * FROM airports WHERE id=?";

    const getFlightInfo = (flightId) => {
      return new Promise((resolve, reject) => {
        db.query(sqlForGettingFlightInfo, [flightId], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };

    const getAirportInfo = (airportCode) => {
      return new Promise((resolve, reject) => {
        db.query(sqlForGettingAirportInfo, [airportCode], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };

    const bookedFlightsPromise = new Promise((resolve, reject) => {
      db.query(sqlForGettingBookedFlightsOfUser, [user], async (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) resolve({ error: "Flights not found" });
        else {
          try {
            // Iterate through each booked flight
            for (let i = 0; i < rows.length; i++) {
              const flight = rows[i];
              const flightInfo = await getFlightInfo(flight.flight_id);
              if (flightInfo) {
                const departureAirport = await getAirportInfo(
                  flightInfo.departure_airport
                );
                const arrivalAirport = await getAirportInfo(
                  flightInfo.arrival_airport
                );

                // Add flight info and airport info to the flight object
                flight.baggage = JSON.parse(flight.baggage);
                flight.flight_info = flightInfo;
                flight.departureAirport = departureAirport;
                flight.arrivalAirport = arrivalAirport;
              }
            }
            resolve(rows);
          } catch (err) {
            reject(err);
          }
        }
      });
    });

    bookedFlightsPromise
      .then((flights) => resolve(flights))
      .catch((err) => reject(err));
  });
};

exports.getBookedSeatsOfFlight = (flight) => {
  return new Promise((resolve, reject) => {
    const sqlForGettingBookedSeatsOfFlight =
      "SELECT seat FROM booked_flights WHERE flight_id=?";
    db.query(sqlForGettingBookedSeatsOfFlight, [flight], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // const bookedSeatsByRow = {};

        // for (let i = 0; i < results.length; i++) {
        //   const seat = results[i].seat;
        //   const rowNumber = parseInt(seat.substring(0, seat.length - 1));
        //   const seatLetter = seat.substring(seat.length - 1);

        //   if (bookedSeatsByRow[rowNumber.toString()]) {
        //     bookedSeatsByRow[rowNumber.toString()].push(seatLetter);
        //   } else {
        //     bookedSeatsByRow[rowNumber.toString()] = [seatLetter];
        //   }
        // }
        // const seatData = [];
        // for (let row = 1; row <= 30; row++) {
        //   const rowNumber = row.toString();
        //   const seatLetters = bookedSeatsByRow[rowNumber] || [];
        //   seatData.push({ [rowNumber]: seatLetters });
        // }

        const seats = results.map((b) => b.seat);

        resolve(seats);
      }
    });
  });
};

exports.updateFlightInfoDuringCheckin = function (body, flight_id) {
  return new Promise((resolve, reject) => {
    // const sql = 'UPDATE tasks SET completed = CASE status WHEN completed=0 THEN 1 WHEN completed=1 THEN 0 END WHERE id = ?';
    const sql =
      "UPDATE booked_flights SET selected_class=?, seat=?, checkin_status='DONE', baggage=?  WHERE id=?";

    const baggageObject =
      body.selected_class === "ECONOM"
        ? [
            { type: "Checkin", kg: 23, amount: 1 },
            { type: "Hand", kg: 10, amount: 1 },
          ]
        : body.selected_class === "BUSINESS"
        ? [
            { type: "Checkin", kg: 32, amount: 1 },
            { type: "Hand", kg: 10, amount: 1 },
          ]
        : [
            { type: "Checkin", kg: 32, amount: 2 },
            { type: "Hand", kg: 10, amount: 1 },
          ];
    const baggageJson = JSON.stringify(baggageObject);
    db.query(
      sql,
      [body.selected_class, body.seat, baggageJson, flight_id],
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
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
  arrivalHour = casual.integer(departureHour + 1, departureHour + 3);
  arrivalMinute = casual.integer(0, 59);
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

  const departureDate = generateRandomDate("2023-05-05", "2023-01-08");
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
