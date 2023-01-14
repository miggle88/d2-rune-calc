import logRequest from '@/server/middlewares/logRequest'
import authenticate from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { CharacterClass } from '@/types'
import { z } from 'zod'

export const profilesRouter = t.router({
  listProfiles: t.procedure
    .use(logRequest)
    .use(authenticate)
    .query(async ({ ctx }) => {
      const profiles = await ctx.prisma.characterProfile.findMany({
        orderBy: [{ isStarred: 'desc' }, { name: 'asc' }],
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
        class: z.nativeEnum(CharacterClass),
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
          class: input.class,
          ladder: input.ladder,
          hardcore: input.hardcore,
        },
      })

      return profile
    }),

  favoriteProfile: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(z.object({ id: z.number(), isStarred: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.characterProfile.updateMany({
        where: {
          id: input.id,
          userId: ctx.session.userId,
        },
        data: {
          isStarred: input.isStarred,
        },
      })

      return profile
    }),

  deleteProfile: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.characterProfile.deleteMany({
        where: {
          id: input.id,
          userId: ctx.session.userId,
        },
      })
    }),
})
