const express = require("express");
const morgan = require("morgan");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const user = require("./routes/user");
const db = require("./models");

var accessLogStream = fs.createWriteStream(path.join("log", "access.log"), {
  flags: "a",
});
const app = express();

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

app.use("/api/user", user);
