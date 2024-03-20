require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbCon')
const cors = require('cors')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOption')
const app = express()

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json())
connectDB()


// routes
app.use('/api/login', require('./routers/login'))
app.use('/api/register', require('./routers/register'))
app.use('/api/user', require('./routers/user'))

app.use('/api/product', require('./routers/product'))
app.use('/api/cart', require('./routers/cart'))
app.use('/api/order', require('./routers/order'))

const PORT = process.env.PORT || 1990


mongoose.connection.once('open', () => {
  console.log('Database connection success')
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
  })
})