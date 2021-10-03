const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getProfile = async (req, res) => {
  console.log(req.params.id)
  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: Number(req.params.id),
    },
    select: {
      firstName: true,
      lastName: true,
      bio: true,
      user: {
        select: {
          email: true,
        }
      }
    }
  }).catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!userProfile) {
    return res.status(404).send({ message: "Profile Not found." })
  }

  res.status(200).send({ userProfile });
}

exports.updateProfile = async (req, res) => {
  const { name, bio } = req.body
  const userProfile = await prisma.profile.update({
    where: {
      userId: Number(req.params.id)
    },
    data: {
      name,
      bio
    }
  }).catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!userProfile) {
    return res.status(404).send({ message: "Profile Not found." })
  }

  res.status(201).send({ userProfile })
}
