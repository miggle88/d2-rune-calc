import { t } from '@/server/trpc'
import { feedbackRouter } from '@/server/routers/feedback'
import { inventoryRouter } from '@/server/routers/inventory'
import { userRouter } from '@/server/routers/users'

export const appRouter = t.mergeRouters(feedbackRouter, inventoryRouter, userRouter)

export type AppRouter = typeof appRouter
