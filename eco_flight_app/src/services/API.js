const url = "http://192.168.1.256:3000";
/*APIs FOR Effects */

// User APIs
// Login

/*
  fetch('https://example.com/data').then((response) => response.json()).then((json) => {
    return data.names;
}).catch((error) => {
    console.error(error);
});
  */

async function logIn(credentials) {
  let response = await fetch(url + "/api/sessions", {
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
  await fetch("/api/sessions/current", { method: "DELETE" }).catch((error) => {
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
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

const API = {
  logIn,
  logOut,
  getUserInfo,
};
export default API;
