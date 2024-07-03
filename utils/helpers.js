require("dotenv").config();
const bcrypt = require("bcrypt");

async function passwordHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

function validateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //defines the regex for used in validation
  return validRegex.test(input) ? true : false;
}

function sendText(to, body, from) {
  const myHeaders = new Headers();
  const clickToken = Buffer.from(process.env.CLICKTOKEN).toString("base64");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Basic ${clickToken}`);

  const raw = JSON.stringify({
    messages: [
      {
        body,
        to,
        from,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://rest.clicksend.com/v3/sms/send", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function generateToken() {
  number = [];
  for (let x = 0; x < 5; x++) {
    number.push(Math.floor(Math.random() * 10));
  }
  return number.join("");
}

module.exports = { validateEmail, passwordHash, sendText, generateToken };
