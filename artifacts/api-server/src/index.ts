import pool from "./config/db";
import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env.PORT) || 10000;

// ✅ Only ONE root route
app.get("/", (req, res) => {
  res.send("Connect-T backend is running ✅");
});

// ✅ DB connection check
pool
  .getConnection()
  .then(() => {
    console.log("MySQL Connected ✅");
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });

// ✅ Start server
app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening 🚀");
});
