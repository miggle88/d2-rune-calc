import authenticate from '@/server/middlewares/authenticate'
import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { RuneInventory } from '@/types'
import { z } from 'zod'

export const inventoryRouter = t.router({
  getInventory: t.procedure
    .use(logRequest)
    .use(authenticate)
    .query(async ({ ctx }) => {
      // Get all the runes that the user has in their inventory
      const inventory = await ctx.prisma.runeInventory.findMany({
        where: {
          userId: ctx.session.userId,
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
    .input(z.object({}).catchall(z.number().min(0).max(999)))
    .mutation(async ({ ctx, input }) => {
      for (const [name, count] of Object.entries(input)) {
        // Find the existing rune inventory for the user/rune combo
        const existingRune = await ctx.prisma.runeInventory.findFirst({
          where: {
            userId: ctx.session.userId,
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
              userId: ctx.session.userId,
              rune: name,
              count,
            },
          })
        }
      }
      return { message: 'ok' }
    }),
})
