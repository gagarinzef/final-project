const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening port ${port}`));