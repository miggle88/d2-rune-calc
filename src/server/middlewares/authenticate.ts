import { t } from '@/server/trpc'
import { TRPCError } from '@trpc/server'

const authenticate = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not logged in',
    })
  }

  return next()
})

export default authenticate
