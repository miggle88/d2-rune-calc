import { t } from '@/server/trpc'
import { feedbackRouter } from '@/server/routers/feedback'
import { inventoryRouter } from '@/server/routers/inventory'
import { profilesRouter } from '@/server/routers/profiles'
import { userRouter } from '@/server/routers/users'

export const appRouter = t.mergeRouters(feedbackRouter, inventoryRouter, profilesRouter, userRouter)

export type AppRouter = typeof appRouter
