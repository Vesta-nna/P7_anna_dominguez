const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const ROLES = ["USER", "ADMIN", "MODERATOR"]

const checkEmail = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (user) {
    res.status(500).send({ message: "Duplicate email" })
    return
  }

  next()
}

const checkRolesExisted = (req, res, next) => {
  if (!ROLES.includes(req.body.role)) {
    res.status(400).send({ message: "Failed! Role does not exist = " + req.body.roles[i] })
    return
  }

  next()
}

const verifySignUp = {
  checkEmail,
  checkRolesExisted
};

module.exports = verifySignUp;