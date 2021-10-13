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
      role: 'USER',
      profile: {
        create: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      }
    },
  }).catch(err => {
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })
  console.log(user)
  return res.send({ message: "Le compte a bien été créé" })
}

// Log user and create Token
exports.login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  }).catch(err => {
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })
  console.log("user", user)
  if (user === null) {
    return res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" })
  }
  const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Le mot de passe n'existe pas"
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {expiresIn: 86400})
  return res.status(200).send({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken: token
  });
}
