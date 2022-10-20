import authenticate from '@/server/middlewares/authenticate'
import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'

export const userRouter = t.router({
  getUserProfile: t.procedure
    .use(logRequest)
    .use(authenticate)
    .query(({ ctx }) => {
      return { ...ctx.session }
    }),
})
