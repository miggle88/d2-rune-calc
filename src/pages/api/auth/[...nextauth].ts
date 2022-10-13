import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/db'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // @ts-ignore
      scope: 'read:user',
    }),
  ],
  secret: process.env.JWT_SECRET!,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false
      }

      // Check if user exists in the database
      const dbUser = await prisma.user.findFirst({
        where: { emailAddress: user.email },
      })

      // Create user in database if they do not exist already
      if (!dbUser) {
        await prisma.user.create({
          data: {
            // @ts-ignore
            name: user.name ?? user.email,
            emailAddress: user.email,
          },
        })
      }
      return true
    },
  },
})
