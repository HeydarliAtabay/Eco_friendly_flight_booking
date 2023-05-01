import { REACT_APP_LOCAL_IPv4_ADRESS } from "../shared_info";
const url = `http://${REACT_APP_LOCAL_IPv4_ADRESS}:3001`;
// const url = "http://192.168.1.8:3001";
/*APIs FOR Effects */

// User APIs
// Login

async function logIn(credentials) {
  let response = await fetch(url + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).catch(function (error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
    // ADD THIS THROW error
    throw error;
  });
  if (response.ok) {
    const user = await response.json();
    return user.name;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (e) {
      alert(e);
    }
  }
}

// logout
async function logOut() {
  await fetch(url + "/api/logout", { method: "DELETE" }).catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });
}

// getting user info
async function getUserInfo() {
  const response = await fetch(url + "/api/sessions/current").catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });
  const userInfo = await response.json();
  if (response && response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

function updateUserPersonalData(body, userid) {
  return new Promise((resolve, reject) => {
    fetch(url + "/api/users/update/" + userid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        surname: body.surname,
        phone_number: body.phone_number,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error message in the response body
            .catch(() => {
              reject({ error: "Cannot parse server response." });
            }); // something else
        }
      })
      .catch(() => {
        reject({ error: "Cannot communicate with the server." });
      }); // connection errors
  });
}

function userSignUp(user) {
  return new Promise((resolve, reject) => {
    fetch(url + "/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date}),
      body: JSON.stringify({
        name: user.name,
        surname: user.surname,
        phone_number: user.phone_number,
        email: user.email,
        hashed_password: user.hashed_password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((message) => {
              reject(message);
            }) // error message in the response body
            .catch(() => {
              reject({ error: "Cannot parse server response." });
            }); // something else
        }
      })
      .catch(() => {
        reject({ error: "Cannot communicate with the server." });
      }); // connection errors
  });
}

// Airport APIs

// list all
const getAirportList = async () => {
  try {
    const response = await fetch(url + "/api/airports");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const API = {
  logIn,
  logOut,
  getUserInfo,
  updateUserPersonalData,
  userSignUp,
  getAirportList,
};
export default API;
