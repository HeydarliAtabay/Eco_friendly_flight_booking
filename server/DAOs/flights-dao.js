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
        db.all(sqlForGettingAirportInfo, [airportCode], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };
    const getAirlineInfo = (airlineId) => {
      return new Promise((resolve, reject) => {
        db.all(sqlForGetAirlineInfo, [airlineId], (err, row) => {
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
            db.all(
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
            db.all(
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
            db.all(
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
    db.run(
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
    db.run(
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
        db.all(sqlForGettingFlightInfo, [flightId], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };

    const getAirportInfo = (airportCode) => {
      return new Promise((resolve, reject) => {
        db.all(sqlForGettingAirportInfo, [airportCode], (err, row) => {
          if (err) reject(err);
          else resolve(row[0]);
        });
      });
    };

    const bookedFlightsPromise = new Promise((resolve, reject) => {
      db.all(sqlForGettingBookedFlightsOfUser, [user], async (err, rows) => {
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
    db.all(sqlForGettingBookedSeatsOfFlight, [flight], (err, results) => {
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
    db.run(
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

// exports.getMostRecentFlightOfUser = (user) => {
//   return new Promise((resolve, reject) => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0];

//     const sqlForGettingRecentFlightOfUser =
//       "SELECT bf.*, f.*, dep.*, arr.* " +
//       "FROM booked_flights bf " +
//       "JOIN flights f ON bf.flight_id = f.id " +
//       "JOIN airports dep ON f.departure_airport = dep.id " +
//       "JOIN airports arr ON f.arrival_airport = arr.id " +
//       "WHERE bf.user_id = ? AND STR_TO_DATE(f.departure_date, '%Y-%m-%d') >= ? " +
//       "ORDER BY STR_TO_DATE(f.departure_date, '%Y-%m-%d') ASC " +
//       "LIMIT 1";

//     db.run(
//       sqlForGettingRecentFlightOfUser,
//       [user, formattedDate],
//       (err, rows) => {
//         if (err) {
//           reject(err);
//         } else if (rows.length === 0) {
//           resolve({ error: "Flights not found" });
//         } else {
//           const flight = rows[0];
//           flight.baggage = JSON.parse(flight.baggage);
//           resolve(flight);
//         }
//       }
//     );
//   });
// };

//

exports.getMostRecentFlightOfUser = (user) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const sqlForGettingRecentFlightOfUser =
      "SELECT bf.*, f.*, dep.*, arr.*, dep.name AS dep_name, arr.name AS arr_name, dep.code AS dep_code, " +
      " arr.code AS arr_code, dep.city AS dep_city, dep.country as dep_country, arr.city AS arr_city, arr.country AS arr_country " +
      "FROM booked_flights bf " +
      "JOIN flights f ON bf.flight_id = f.id " +
      "JOIN airports dep ON f.departure_airport = dep.id " +
      "JOIN airports arr ON f.arrival_airport = arr.id " +
      "WHERE bf.user_id = ? AND strftime('%s', f.departure_date) >= strftime('%s', ?) " +
      "ORDER BY strftime('%s', f.departure_date) ASC " +
      "LIMIT 1";

    db.all(
      sqlForGettingRecentFlightOfUser,
      [user, formattedDate],
      (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows.length === 0) {
          resolve({ error: "Flights not found" });
        } else {
          const flight = rows[0];
          flight.baggage = JSON.parse(flight.baggage);
          const departureAirport = {
            id: flight.departure_airport,
            code: flight.dep_code,
            name: flight.dep_name,
            city: flight.dep_city,
            country: flight.dep_country,
          };
          const arrivalAirport = {
            id: flight.arrival_airport,
            code: flight.arr_code,
            name: flight.arr_name,
            city: flight.arr_city,
            country: flight.arr_country,
          };
          const flightInfo = {
            id: flight.flight_id,
            departure_airport: flight.departure_airport,
            arrival_airport: flight.arrival_airport,
            departure_date: flight.departure_date,
            departure_time: flight.departure_time,
            arrival_date: flight.arrival_date,
            arrival_time: flight.arrival_time,
            econom_price: flight.econom_price,
            business_price: flight.business_price,
            first_class_price: flight.first_class_price,
            airline: flight.airline,
            flight_number: flight.flight_number,
          };
          const result = {
            id: flight.id,
            user_id: flight.user_id,
            flight_id: flight.flight_id,
            seat: flight.seat,
            payment_status: flight.payment_status,
            checkin_status: flight.checkin_status,
            selected_class: flight.selected_class,
            paid_price: flight.paid_price,
            baggage: flight.baggage,
            flight_info: flightInfo,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
          };
          resolve(result);
        }
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
  const departureAirport = casual.integer(1, 4);
  let arrivalAirport = casual.integer(1, 4);

  while (arrivalAirport === departureAirport) {
    arrivalAirport = casual.integer(1, 4);
  }

  const departureDate = generateRandomDate("2023-06-09", "2023-06-20");
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
