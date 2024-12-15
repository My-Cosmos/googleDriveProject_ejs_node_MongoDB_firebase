const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

router.get("/login", (req, res) => {
  res.render("authPages/login");
});

router.post(
  "/login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 1 }),
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }

    const find_the_user_in_mongoDB = await userModel.findOne({
      email: email,
    });
    if (!find_the_user_in_mongoDB) {
      return res.status(400).json({
        // message: 'Username is incorrect',
        message: "Stay Away",
      });
    }

    const auth_Password = await bcrypt.compare(
      password,
      find_the_user_in_mongoDB.password
    ); //output is boolean true/false

    if (!auth_Password) {
      return res.status(400).json({
        // message: 'Password is incorrect',
        message: "Stay Away",
      });
    }

    /* ~ Generate JWT **token** */
    const token = jwt.sign(
      {
        userId: find_the_user_in_mongoDB._id,
        email: find_the_user_in_mongoDB.email,
        username: find_the_user_in_mongoDB.username,
      },
      process.env.JWT_SECRET
    );

    // ~ for setting the cookie in chromeBrowser>application_tab>cookies
    res.cookie('set_cookie_SangramjitRoy_token', token);

    res.send("User Exists");
  }
);

module.exports = router;
