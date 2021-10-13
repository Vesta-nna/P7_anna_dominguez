const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

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
  const { firstName, lastName, bio } = req.body
  const userProfile = await prisma.profile.update({
    where: {
      userId: Number(req.params.id)
    },
    data: {
      firstName,
      lastName,
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

exports.updateEmail = async (req, res) => {
  const { email } = req.body
  const user = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      email
    }
  })

  .catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!user) {
    return res.status(404).send({ message: "User Not found." })
  }

  res.status(201).send({ message: 'Success' })
}

exports.updatePassword = async (req, res) => {
  const { password } = req.body
  const user = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      password: await bcrypt.hash(password, 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
    }
  })

  .catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!user) {
    return res.status(404).send({ message: "User Not found." })
  }

  res.status(201).send({ message: 'Success' })
}

exports.deleteUserCascade = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const deletePosts = prisma.post.deleteMany({
  where: {
      authorId: Number(id),
    },
  })
  console.log(deletePosts)

  const deleteProfile = prisma.profile.delete({
    where: {
      userId: Number(id),
    },
  })

  console.log(deleteProfile)

  const deleteUser = prisma.user.delete({
    where: {
      id: Number(id),
    },
  })

  console.log(deleteUser)

  const transaction = await prisma.$transaction([deletePosts, deleteProfile, deleteUser])
  console.log(transaction)
  res.status(201).send({ message: 'Success' })
}
