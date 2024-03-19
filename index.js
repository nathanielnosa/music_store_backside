require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbCon')

const app = express()

app.use(express.json())
connectDB()




const PORT = process.env.PORT || 1990


mongoose.connection.once('open', () => {
  console.log('Database connection success')
  app.listen(() => {
    console.log(`server running on http://localhost:${PORT}`)
  })
})