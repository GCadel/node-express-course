const { JsonWebTokenError, sign, decode, verify } = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { json } = require("express");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // (Verify user exists in database first) Create a jwt
    // The ID is a random placeholder. Normally it will be from the db
    const id = new Date().getDate();
    const token = sign({ username, id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(decode(token));

    // send to frontend
    return res.status(200).json({ msg: `Account created`, token });
  }
  throw new CustomAPIError("Missing username or password", 400);
};

const dashboard = async (req, res) => {
  const { user } = req;
  const luckyNum = Math.floor(Math.random() * 42);
  res.status(200).json({
    msg: `Hello, ${user.username}`,
    secret: `Your auth data: ${luckyNum}`,
  });
};

module.exports = { login, dashboard };
