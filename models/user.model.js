const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, 'Username must be atleast 3 characters']
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [1, 'Username must be atleast 1 characters']
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: [1, 'password must be atleast 1 characters']
  },
});


const SangramjitRoy_googleDriveUser = mongoose.model('SangramjitRoy_googleDriveUser', userSchema);
module.exports = SangramjitRoy_googleDriveUser;