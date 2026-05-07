const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [complaints] = await db.query(
      "SELECT * FROM complaints ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Get complaints error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      photoUri,
      location,
      ward,
      userName,
      userMobile,
      userAddress,
      userAge,
      userEmail,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO complaints
      (title, description, category, photo_url, location, ward, status, user_name, user_mobile, user_address, user_age, user_email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        photoUri || null,
        location,
        ward,
        "submitted",
        userName || null,
        userMobile || null,
        userAddress || null,
        userAge || null,
        userEmail || null,
      ]
    );

    res.json({
      success: true,
      complaintId: result.insertId,
    });
  } catch (error) {
    console.error("Create complaint error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note, updatedBy } = req.body;

    await db.query(
      "UPDATE complaints SET status = ?, resolved_note = ?, updated_at = NOW() WHERE id = ?",
      [status, status === "resolved" ? note || null : null, id]
    );

    await db.query(
      `INSERT INTO complaint_updates
      (complaint_id, status, note, updated_by)
      VALUES (?, ?, ?, ?)`,
      [id, status, note || null, updatedBy || "System"]
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Update complaint status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
