const jwt = require("jsonwebtoken");
const SECRET_KEY = "funny_app";

const createToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  createToken,
  verifyToken,
};
