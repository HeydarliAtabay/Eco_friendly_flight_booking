"use strict";
const express = require("express");
const app = new express();
const PORT = 3001;
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersDao = require("./DAOs/user-dao");
const flightsDao = require("./DAOs/flights-dao");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // username and password for login
const session = require("express-session");

app.use(morgan("dev"));
app.use(express.json());
const request = require("request");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `Hi from the server, which is running on  http://localhost:${PORT}/`
  );
});

// for user authentication

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("username " + username + " password " + password);
    usersDao
      .getUser(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password.",
          });
        return done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  usersDao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

// checking whether the user is authenticated or not
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

// set up the session
app.use(
  session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: "Ondan ona ondan ona, cay verun limonnan ona",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

/** Get Airlines */

// var name = "Lufthansa";

app.get("/api/airlines", (req, res) => {
  request.get(
    {
      url: "https://api.api-ninjas.com/v1/airlines?name=" + "Qatar Airways",
      headers: {
        "X-Api-Key": "CLBZuWQZfjmrAXKJMAiWlA==gHG8CVs8NYpm2TXV",
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else console.log(body);
    }
  );
});

/******* Flights APIs ********/
app.post("/api/searchflights/", (req, res) => {
  const body = req.body;
  flightsDao
    .getFlightsByDateAndAirpot(body)
    .then((flights) => {
      res.json(flights);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post("/api/createflight/", (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(400).end();
  } else {
    flightsDao
      .createFlight(body)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => res.status(500).json(err.message));
  }
});

const generateAndInsertFlights = (number) => {
  const flights = [];

  for (let i = 0; i < number; i++) {
    const flight = flightsDao.generateFlight();
    flights.push(flight);
  }
  const promises = flights.map((flight) => flightsDao.createFlight(flight));
  Promise.all(promises)
    .then((ids) => {
      console.log("Flights inserted:", ids);
    })
    .catch((err) => {
      console.error("Error inserting flights:", err);
    });
};

app.post("/api/createFakeFlights/:number", (req, res) => {
  const numberOfFlights = Number(req.params.number);
  const body = req.body;
  if (!body) {
    res.status(400).end();
  } else {
    generateAndInsertFlights(numberOfFlights);
  }
});

/*** Users APIs ***/

app.get("/api/users", (req, res) => {
  usersDao
    .listAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// login
app.post("/api/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

app.post("/api/signUp", (req, res) => {
  const user = req.body;
  if (!user) {
    res.status(400).end();
  } else {
    usersDao
      .signUp(user)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => res.status(500).json(err.message));
  }
});

// DELETE /sessions/current
// logout
app.delete("/api/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

app.put("/api/users/update/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  console.log(body);
  try {
    await usersDao.updatePersonalInfo(body, id);
    res.json(
      `User personal data with: ${id}  was changed modified succesfully`
    );
  } catch (error) {
    res
      .status(500)
      .json(`Error while updating info of user with id: ${id}   ` + error);
  }
});

// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
