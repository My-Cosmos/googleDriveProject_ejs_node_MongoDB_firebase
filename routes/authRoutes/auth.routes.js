const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../../models/user.model");
const bcrypt = require('bcrypt');

router.get("/register", (req, res) => {
  res.render("authPages/register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 1 }),
  body("username").trim().isLength({ min: 1 }),
  async (req, res) => {
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

    // ~ creating user to MongoDBAtlas database
    const { username, email, password } = req.body;

    // ~ Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res)=>{
  res.render('authPages/login');
})

module.exports = router;
