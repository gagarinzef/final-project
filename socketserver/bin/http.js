const { app } = require("../index");
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});

module.exports = server;
