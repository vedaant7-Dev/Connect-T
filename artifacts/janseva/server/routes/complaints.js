const express = require("express");

const router = express.Router();

let complaints = [];

router.get("/", (req, res) => {
  res.json(complaints);
});

router.post("/", (req, res) => {
  const complaint = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
  };

  complaints.unshift(complaint);

  res.json({
    success: true,
    complaint,
  });
});

module.exports = router;
