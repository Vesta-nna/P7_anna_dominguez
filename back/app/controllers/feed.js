const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              bio: true
            }
          }
        }
      }
    }
  }).catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!posts) {
    return res.status(404).send({ message: "Posts Not found." })
  }

  res.status(200).send({ posts });
}

exports.createPost = async (req, res) => {
  const { content, userId } = req.body
  const posts = await prisma.post.create({
    data: {
      content,
      authorId: userId
    }
  }).catch(err => {
    console.log(err)
    return res.status(500).send({ message: err.message })
  }).finally(async () => {
    await prisma.$disconnect()
  })

  if (!posts) {
    return res.status(404).send({ message: "Prost Not Created." })
  }

  res.status(200).send({ posts });
}

exports.deletePost = async (req, res) => {
  const post = await prisma.post.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  res.status(200).send({ post })
}
