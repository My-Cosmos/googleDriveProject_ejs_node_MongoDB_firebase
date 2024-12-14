const mongoose = require("mongoose");
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB_Atlas");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDB;
