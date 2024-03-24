const User = require('../models/Users')


const updateUser = async (req, res) => {
  const { firstname, lastname, username, email, password, image } = req.body
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (firstname) foundUser.firstname = firstname
    if (lastname) foundUser.lastname = lastname
    if (username) foundUser.username = username
    if (email) foundUser.email = email
    if (password) foundUser.password = password
    if (image) foundUser.image = image

    const result = await foundUser.save()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const deleteUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(302).json("No User with id found")
    const result = await foundUser.deleteOne({ _id: req.params.id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)

  }
}

const getUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id }).exec()
    if (!foundUser) return res.status(302).json("No User with id found")
    const { password, ...others } = foundUser._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

const getUsers = async (req, res) => {
  const query = req.query.new
  try {
    const users = query ? await User.find().sort({ createdAt: -1 }).limit(3).exec() : await User.find().exec()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

//user stat
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(`Error: ${error.message}`)
  }
}

module.exports = { updateUser, deleteUser, getUser, getUsers,getUserStats }