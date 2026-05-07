const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    success: true,
    jobs: [],
  });
});

router.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "Job created endpoint ready",
  });
});

module.exports = router;
