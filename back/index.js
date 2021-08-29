import express from 'express'
import helmet from 'helmet'

import UserRoutes from "./routes/user.js"

const app = express()

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(express.json())

app.use('/api/auth', UserRoutes)

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)