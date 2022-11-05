import { t } from '@/server/trpc'
import { TRPCError } from '@trpc/server'

const adminAccess = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session.isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permissions to perform this action',
    })
  }

  return next()
})

export default adminAccess
