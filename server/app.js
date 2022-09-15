if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const exoress = require("express");
const app = express();
// const server = require("http").Server(app);
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

// server.listen(PORT, () => console.log(`Listening port ${PORT}`));

const server = app.listen(PORT, () => {
  console.log("started app");
});

const socket = new WebSocket.Server({ server: server });

export default socket;
