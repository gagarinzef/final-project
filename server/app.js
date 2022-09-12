require("dotenv").config();
const cors = require("cors");
// const express = require("express");
// const app = express();
const PORT = process.env.PORT || 3001;
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = require("express")();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
const bodyParser = require("body-parser");
// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ port: 3002 });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

server.listen(PORT, () => console.log(`Listening port ${PORT}`));

module.exports = app;
