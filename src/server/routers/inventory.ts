import authenticate from '@/server/middlewares/authenticate'
import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { RuneInventory } from '@/types'

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
})
