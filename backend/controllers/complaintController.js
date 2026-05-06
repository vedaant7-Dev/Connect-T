const db = require("../config/db");

exports.getComplaints = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM complaints ORDER BY created_at DESC");
    res.json({ success: true, complaints: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      ward,
      userName,
      userMobile,
      userAddress,
      userAge,
      userEmail
    } = req.body;

    const id = "CMP" + Date.now();

    await db.query(
      `INSERT INTO complaints
      (id, title, description, category, location, ward, status, user_name, user_mobile, user_address, user_age, user_email, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, title, description, category, location, ward, userName, userMobile, userAddress, userAge || null, userEmail || null]
    );

    res.json({ success: true, complaintId: id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
