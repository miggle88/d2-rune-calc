import NextAuth, { User } from 'next-auth'
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
            name: (user as User)?.name ?? 'Unknown User',
            emailAddress: user.email,
          },
        })
      }

      console.log('SIGN IN>')
      return true
    },
    async jwt({ token }) {
      if (token.userId) {
        return token
      }

      // Find the user in the database
      const dbUser = await prisma.user.findFirst({
        where: { emailAddress: token.email },
      })

      // If user exists, attach the user id to the token
      if (dbUser) {
        token.userId = dbUser.id
      }

      return token
    },
    async session({ session, token }) {
      // Include user id from the token into the session
      session.userId = token.userId
      return session
    },
  },
})
