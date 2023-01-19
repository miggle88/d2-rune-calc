import authenticate from '@/server/middlewares/authenticate'
import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { RuneInventory } from '@/types'
import { z } from 'zod'

export const inventoryRouter = t.router({
  getInventory: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(z.object({ profileId: z.number() }))
    .query(async ({ ctx, input }) => {
      // Validate that the profile belongs to the user
      const profile = await ctx.prisma.characterProfile.findFirst({
        where: {
          userId: ctx.session.userId,
          id: input.profileId,
        },
      })

      if (!profile) {
        throw new Error('Inventory not found')
      }

      // Get all the runes that the character has in their inventory
      const inventory = await ctx.prisma.runeInventory.findMany({
        where: {
          profileId: input.profileId,
        },
      })

      // Reduce the array of runes into a mapped object (dictionary) by name/count
      const formattedInventory: RuneInventory = inventory.reduce((inv, data) => {
        inv[data.rune] = data.count
        return inv
      }, {} as RuneInventory)

      return formattedInventory
    }),
  updateInventory: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(
      z.object({
        profileId: z.number(),
        inventory: z.object({}).catchall(z.number().min(0).max(999)),
      })
    )

    .mutation(async ({ ctx, input }) => {
      // Validate that the profile belongs to the user
      const profile = await ctx.prisma.characterProfile.findFirst({
        where: {
          userId: ctx.session.userId,
          id: input.profileId,
        },
      })

      if (!profile) {
        throw new Error('Inventory not found')
      }

      for (const [name, count] of Object.entries(input.inventory)) {
        // Find the existing rune inventory for the character/rune combo
        const existingRune = await ctx.prisma.runeInventory.findFirst({
          where: {
            profileId: input.profileId,
            rune: name,
          },
        })

        if (existingRune) {
          // If exists and the new count > 0, update
          if (count > 0) {
            await ctx.prisma.runeInventory.update({
              data: { count },
              where: { id: existingRune.id },
            })
          } else {
            // If new count <= 0, delete the record
            await ctx.prisma.runeInventory.delete({
              where: { id: existingRune.id },
            })
          }
        } else if (count > 0) {
          // Create new record with the count when > 0
          await ctx.prisma.runeInventory.create({
            data: {
              profileId: input.profileId,
              rune: name,
              count,
            },
          })
        }
      }
    }),
  clearInventory: t.procedure
    .use(logRequest)
    .use(authenticate)
    .input(z.object({ profileId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Validate that the profile belongs to the user
      const profile = await ctx.prisma.characterProfile.findFirst({
        where: {
          userId: ctx.session.userId,
          id: input.profileId,
        },
      })

      if (!profile) {
        throw new Error('Inventory not found')
      }

      await ctx.prisma.runeInventory.deleteMany({
        where: {
          profileId: input.profileId,
        },
      })
    }),
})
