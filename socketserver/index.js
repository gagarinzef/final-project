const express = require("express");
const app = express();
const server = require("./bin/http");
const axios = require("axios");

const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // *
    methods: ["GET", "POST"],
  },
});

const saveChat = (result) => {
  const SOCKET_SECRET_KEY = "kGFHCuUoOlRyoBgRis5y9KfDKvKWpO66";
  const { data } = result;

  axios(`http://localhost:3001/chat`, {
    method: "post",
    headers: {
      socket_key: SOCKET_SECRET_KEY,
    },
    data: data,
  })
    // .then((result) => console.log(result))
    // .catch((err) => console.log(err));
};

io.on("connection", (socket) => {
  socket.on("join_project_chat", (data) => {
    console.log("join_project_chat", data);
    socket.join(data);
  });

  socket.on("leave_project_chat", (data) => {
    console.log("leave_project_chat", data);
    socket.leave(data);
  });

  socket.on("send_message", (data) => {
    console.log("send_message", data.data.project_id);
    saveChat(data);
    // socket.to(data.data.project_id).emit("receive_message", data)
    io.sockets.in(data.data.project_id).emit("receive_message", data); // untuk watch
  });
});

module.exports = { app, io };
