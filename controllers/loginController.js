const User = require('../models/Users')

const jwt = require('jsonwebtoken')
const CryptoJs = require('crypto-js')

const handleLogin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(401).json("Enter username/password")
  try {
    const logUser = await User.findOne({ username }).exec()
    if (!logUser) return res.status(401).json("Invalid username/password");

    const match = CryptoJs.AES.decrypt(logUser.password, process.env.PWDENC).toString(CryptoJs.enc.Utf8)
    if (match !== password) return res.status(401).json("Invalid username/password")

    //jwt
    const access_token = jwt.sign(
      { id: logUser._id, isAdmin: logUser.isAdmin },
      process.env.JWT,
      { expiresIn: '3d' }
    )

    const { password: userPwd, ...others } = logUser._doc
    res.status(200).json(`${others.firstname} logged in successfully,${access_token}`)

  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { handleLogin }