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
          firstName: 'Anna',
          lastName: 'Dominguez'
        }
      },
      posts: {
        create: {
          content: `Epictète : “N’attends pas que les événements arrivent comme tu le souhaites ; décide de vouloir ce qui arrive et tu seras heureux” (Le Manuel)`,
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
          firstName: 'Arthur',
          lastName: 'Schopenhauer',
          bio: "Sartre: “L'homme est condamné à être libre”"
        }
      },
      posts: {
        create: [
          {
            content: `Schopenhauer : “L'homme est un animal métaphysique” (Le Monde comme volonté et comme représentation)`,
          },
          {
            content: `Schopenhauer : “La vie oscille, tel un pendule, de l'ennui à la souffrance” (Le Monde comme volonté et comme représentation)`,
          },
        ],
      },
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'simone@gmail.com',
      password: await bcrypt.hash('user', 8).catch(err => {
        res.status(500).send({ message: err.message })
      }),
      role: "USER",
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Locke',
          bio: 'Locke: “La connaissance de l\'homme ne peut pas s\'étendre au-delà de son expérience propre”'
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
