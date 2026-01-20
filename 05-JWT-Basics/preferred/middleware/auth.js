const { verify } = require("jsonwebtoken");
const { UnathenticatedError } = require("../errors");

const protectedAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnathenticatedError("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const { name } = decoded;
    req.user = { name };
    next();
  } catch (error) {
    throw new UnathenticatedError("Unauthorized");
  }
};

module.exports = protectedAuthMiddleware;
