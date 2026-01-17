const { JsonWebTokenError, sign, decode, verify } = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { json } = require("express");

const login = async (req, res) => {
  console.log(req.body);
  // Check for username and password in body
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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No auth token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    console.log(Date(decoded.iat), Date(decoded.exp));
    const luckyNum = Math.floor(Math.random() * 42);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Your auth data: ${luckyNum}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access route", 401);
  }
};

module.exports = { login, dashboard };
