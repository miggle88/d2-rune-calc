import { t } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

type DummyUser = {
  id: number
  username: string
  firstName: string
  lastName: string
  displayName: string
  emailAddress: string
}

let loggedInUser: DummyUser | null = null

export const authRouter = t.router({
  login: t.procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      if (input.password !== 'password') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid password',
        })
      }

      loggedInUser = {
        id: 1,
        username: input.username,
        firstName: 'John',
        lastName: 'Doe',
        displayName: `John Doe (${input.username})`,
        emailAddress: 'john.doe@email.com',
      }

      return loggedInUser
    }),
  logout: t.procedure.mutation(({ input }) => {
    loggedInUser = null
    return {}
  }),
  getCurrentUser: t.procedure.query(() => loggedInUser),
})
