const express = require("express");
const router = express.Router();
// ~ multer
const multer = require("multer");
const path = require("path");

router.get("/upload-file", (req, res) => {
  res.render("fileUploadPage/uploadFile");
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads")); // Save files to /public/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique filename
  },
});
// Multer filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
      cb(new Error("Only image files are allowed!"), false);
  }
};
// Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});
router.post(
  "/upload",
  upload.single("Sangramjit_Roy_Sample_File"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded or invalid file format.");
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
  }
);

module.exports = router;
