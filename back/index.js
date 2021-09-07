const express = require("express")
require('dotenv').config()
const cors = require("cors")

const helmet = require("helmet")

const userRoutes = require('./app/routes/user')
const roleRoutes = require('./app/routes/role')

const app = express()

app.use(helmet())

app.use(cors({
  origin: "http://localhost:8081"
}))

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(express.json())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to groupomania application." })
})

app.use('/api/auth', userRoutes)

app.use('/api/test', roleRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})