const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

// Upload Route (file only)
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      url: req.file.path, // Cloudinary uploaded file URL
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
