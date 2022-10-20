import { t } from '@/server/trpc'
import { inventoryRouter } from '@/server/routers/inventory'
import { userRouter } from '@/server/routers/users'

export const appRouter = t.mergeRouters(inventoryRouter, userRouter)

export type AppRouter = typeof appRouter
