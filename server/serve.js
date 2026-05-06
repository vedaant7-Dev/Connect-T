require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConnectT backend running",
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});

