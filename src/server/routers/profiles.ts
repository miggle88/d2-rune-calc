import logRequest from '@/server/middlewares/logRequest'
import authenticate from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { z } from 'zod'

export const profilesRouter = t.router({
  listProfiles: t.procedure
    .use(logRequest)
    .use(authenticate)
    .query(async ({ ctx }) => {
      const profiles = await ctx.prisma.characterProfile.findMany({
        where: {
          userId: ctx.session.userId,
        },
      })

      return profiles
    }),

  createProfile: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(
      z.object({
        name: z.string().min(1).max(100),
        level: z.number().min(1).max(99),
        class: z.string().min(1).max(50),
        ladder: z.boolean().default(false),
        hardcore: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingProfile = await ctx.prisma.characterProfile.findFirst({
        where: {
          userId: ctx.session.userId,
          name: input.name,
        },
      })

      if (existingProfile) {
        throw new Error('Profile already exists')
      }

      const profile = await ctx.prisma.characterProfile.create({
        data: {
          userId: ctx.session.userId,
          name: input.name,
          level: input.level,
          class: input.class,
          ladder: input.ladder,
          hardcore: input.hardcore,
        },
      })

      return profile
    }),
})
