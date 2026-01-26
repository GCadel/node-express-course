const { verify } = require("jsonwebtoken");
const { BadRequestError, UnathenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnathenticatedError("No Token Provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnathenticatedError("Not authorized to access route");
  }
};

module.exports = authMiddleware;
