const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin', 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
      role: "ADMIN",
      profile: {
        create: {
          firstName: 'admin',
          lastName: 'admin'
        }
      },
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })

  const moderator = await prisma.user.upsert({
    where: { email: 'moderator@gmail.com' },
    update: {},
    create: {
      email: 'moderator@gmail.com',
      password: await bcrypt.hash('moderator', 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
      profile: {
        create: {
          firstName: 'user1',
          lastName: 'user1'
        }
      },
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      password: await bcrypt.hash('user', 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
      role: "USER",
      profile: {
        create: {
          firstName: 'user',
          lastName: 'user'
        }
      },
    },
  })
  console.log({ admin, moderator, user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
