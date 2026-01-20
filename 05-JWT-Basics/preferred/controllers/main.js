const { sign } = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const logon = async (req, res) => {
  const { name, password } = req.body;
  // return a 24h token with user's name
  if (name && password) {
    const token = sign({ name }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .status(200)
      .json({ message: `Successfully created a token`, token });
  }
  throw new BadRequestError("Missing name or password");
};

const hello = async (req, res) => {
  const { user } = req;
  return res.status(200).json({ message: `Hello there, ${user.name}` });
};

module.exports = { logon, hello };
