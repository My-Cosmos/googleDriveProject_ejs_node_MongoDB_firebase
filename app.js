const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes/auth.routes");
const homeRouter = require("./routes/homeRoute/home.routes");
const uploadFileRouter = require("./routes/fileUploadRoute/uploadFile.routes");
const dotenv = require("dotenv");
// ~ for saving the JWT_token using cookies(cookie-parser)
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the 'views' directory (default is './views')
app.set("views", "./views"); // default is set only
// load static files.
app.use(express.static("public"));
// ~ to read req.body in post routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ~ connecting securely with .env()
dotenv.config();
// ~ connect to dataBase MongoDB_Atlas
const connectDB = require("./config/db");
connectDB();

app.use("/auth-route", authRouter);
app.use("/", homeRouter, uploadFileRouter);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
