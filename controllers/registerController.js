const { sendWelcomeEmail } = require('../config/mailer')
const User = require('../models/Users')
const CryptoJs = require('crypto-js')

const handleRegister = async (req, res) => {
  const { firstname, lastname, username, email, password, cPwd } = req.body

  try {
    // Encrypt trimmed passwords
    if (password !== cPwd) return res.status(401).json('Password not match!')
    const pwd = CryptoJs.AES.encrypt(password, process.env.PWDENC).toString();

    const newUser = await User.create(
      {
        firstname,
        lastname,
        username,
        email,
        password: pwd,
      })
    await sendWelcomeEmail(newUser.email, newUser.firstname)
    res.status(201).json(`${newUser.firstname} created successfully`)

  } catch (error) {
    res.status(500).json(`Error:${error.message}`)
  }
}

module.exports = { handleRegister }