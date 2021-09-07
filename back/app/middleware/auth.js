const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({ message: "No token provided!" })
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({  message: "Unauthorized!" })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId
    },
  }).finally(async () => {
    await prisma.$disconnect()
  })
  if (user.role === "ADMIN") {
    next()
    return
  }
  res.status(403).send({ message: "Require Admin Role!" })
  return
}

isModerator = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId
    },
  }).finally(async () => {
    await prisma.$disconnect()
  })
  if (user.role === "MODERATOR") {
    next()
    return
  }
  res.status(403).send({ message: "Require Moderator Role!" })
  return
}

isModeratorOrAdmin = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId
    },
  }).finally(async () => {
    await prisma.$disconnect()
  })
  if (user.role === "ADMIN") {
    next()
    return
  }
  if (user.role === "MODERATOR") {
    next()
    return
  }
  res.status(403).send({ message: "Require Moderator or Admin Role!" })
  return
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
}

module.exports = authJwt