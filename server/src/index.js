"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var db_1 = require("./config/db");
var app_1 = require("./app");
var logger_1 = require("./lib/logger");

// ✅ Safe PORT handling (works on Render + local)
var port = Number(process.env.PORT) || 5000;

if (Number.isNaN(port) || port <= 0) {
  throw new Error("Invalid PORT value");
}

// ✅ Connect to MySQL
db_1.default
  .getConnection()
  .then(function () {
    console.log("MySQL Connected");
  })
  .catch(function (err) {
    console.error("DB Error:", err);
  });

// ✅ Start server
app_1.default.listen(port, function (err) {
  if (err) {
    logger_1.logger.error({ err: err }, "Error listening on port");
    process.exit(1);
  }

  logger_1.logger.info({ port: port }, "Server listening");
});
