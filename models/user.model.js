const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  profile_photo: String,
  phoneNumber: {
    isVerified: Boolean,
    value: String
  },
  gmail: String,
  google_id: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
