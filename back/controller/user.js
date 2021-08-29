import Prisma from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()


export const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10)
    }
  })
  res.json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_TOKEN,
        { expiresIn: '24h' })
        res.json({userId: user.id, token})
    } else {
      console.error("not match")
    }
  }
}