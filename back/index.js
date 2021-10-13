const express = require("express")
require('dotenv').config()

const helmet = require("helmet")

const userRoutes = require('./app/routes/user')
const roleRoutes = require('./app/routes/roles')
const profileRoutes = require('./app/routes/profile')
const feedRoutes = require('./app/routes/feed')

const app = express()

app.use(helmet())

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Access-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(express.json())

app.use('/api/auth', userRoutes)

app.use('/api/test', roleRoutes)

app.use('/api/profile', profileRoutes)

app.use('/api/feed/', feedRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
