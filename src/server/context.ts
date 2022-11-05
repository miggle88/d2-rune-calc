import { UserSession } from '@/types'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '@/db'
import { getSession } from 'next-auth/react'

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx

  const session = await getSession({ req })

  return {
    req,
    res,
    session: session as UserSession,
    prisma,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
