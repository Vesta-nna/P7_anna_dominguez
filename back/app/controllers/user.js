const { PrismaClient } = require('@prisma/client')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()


// Save User to Database
exports.signup = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
      role: req.body.role
    },
  }).catch(err => {
    res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })
  console.log(user)
  res.send({ message: "User was registered successfully!" })
}

// Log user and create Token
exports.login = async (req, res) => {
  console.log(req.body)
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  }).catch(err => {
    res.status(500).send({ message: err.message })
  })
  console.log(user)
  if (!user) {
    res.status(404).send({ message: "User Not found." })
  }
  console.log(user.password, req.body.password)
  const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {expiresIn: 86400})
  res.status(200).send({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken: token
  });
}