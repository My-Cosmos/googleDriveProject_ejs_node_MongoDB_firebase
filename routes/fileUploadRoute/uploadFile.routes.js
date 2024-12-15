const express = require("express");
const router = express.Router();

router.get("/upload-file", (req, res) => {
  res.render("fileUploadPage/uploadFile");
});


module.exports = router;
