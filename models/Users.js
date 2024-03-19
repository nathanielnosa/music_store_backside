const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)
module.exports = userModel