const express = require("express");
const cors = require("cors");
const config = require("./auth/config");
const app = express();

const templates = require("./routes/templates-routes");
const driveCreate = require("./routes/driveCreate-routes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("view"));
app.use("/api", templates.routes);
app.use("/create", driveCreate.routes);

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
