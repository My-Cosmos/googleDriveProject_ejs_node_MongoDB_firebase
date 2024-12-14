const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("authPages/register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 1 }),
  body("username").trim().isLength({ min: 1 }),
  (req, res) => {
    console.log(req.body);
    // ~ express-validator npm package method this is
    const errors = validationResult(req);
    // console.log(errors.errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }

    res.send("User successfully registered");
  }
);

module.exports = router;
