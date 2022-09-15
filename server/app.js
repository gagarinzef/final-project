if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

server.listen(PORT, () => console.log(`Listening port ${PORT}`));

module.exports = app;
