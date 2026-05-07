require("dotenv").config();

const express = require("express");
const cors = require("cors");

const complaintRoutes = require("./routes/complaints");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConnectT backend running",
  });
});

app.use("/complaints", complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ConnectT backend running on port ${PORT}`);
});
