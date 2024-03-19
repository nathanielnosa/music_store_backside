const mongoose = require('mongoose')

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_DB)
  } catch (error) {
    console.log('Database failed to connect')
  }
}

module.exports = connectDB