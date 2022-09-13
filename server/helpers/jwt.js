const jwt = require("jsonwebtoken");
const SECRET_KEY = "funny_app";

const createToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  createToken,
  verifyToken,
};

// console.log(
//   verifyToken(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNzk0NDg5fQ.k_mdh2gX9DT8ycWPtIujHmNMjbi4ETwiS5aA_QY4O9c"
//   )
// );
console.log(
  verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjYzMDM5ODkxfQ.dYCEYLDuel5kkdetOKKKx5Z7FjOG1SwpprsnynOCgB0"
  )
);

console.log(createToken({ id: 4 }));