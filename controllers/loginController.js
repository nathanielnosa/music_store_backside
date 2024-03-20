const User = require('../models/Users')

const jwt = require('jsonwebtoken')
const CryptoJs = require('crypto-js')

const handleLogin = async (req, res) => {
  const { username, password, rememberMe } = req.body
  if (!username || !password) return res.status(401).json("Enter username/password")
  try {
    const logUser = await User.findOne({ username }).exec()
    if (!logUser) return res.status(401).json("Invalid username/password");

    const match = CryptoJs.AES.decrypt(logUser.password, process.env.PWDENC).toString(CryptoJs.enc.Utf8)
    if (match !== password) return res.status(401).json("Invalid username/password")

    //jwt
    // Generate JWT token
    const expiresIn = rememberMe ? '7d' : '1d';
    const access_token = jwt.sign(
      { id: logUser._id, isAdmin: logUser.isAdmin },
      process.env.JWT,
      { expiresIn }
    )
    // Set the JWT token in a cookie with httpOnly flag
    res.cookie('token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: rememberMe ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined
      // secure: true,
    });


    const { password: userPwd, ...others } = logUser._doc
    res.status(200).json({ message: `${others.firstname} logged in successfully`, access_token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleLogin }