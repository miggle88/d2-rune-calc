import { t } from '@/server/trpc'
import { authRouter } from '@/server/routers/auth'
import { userRouter } from '@/server/routers/users'

export const appRouter = t.mergeRouters(authRouter, userRouter)

export type AppRouter = typeof appRouter
