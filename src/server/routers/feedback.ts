import adminAccess from '@/server/middlewares/adminAccess'
import authenticate from '@/server/middlewares/authenticate'
import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { z } from 'zod'

export const feedbackRouter = t.router({
  listFeedback: t.procedure
    .use(logRequest)
    .use(authenticate)
    .use(adminAccess)
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        includeUser: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.prisma.feedback.count()
      const pageCount = Math.ceil(totalCount / input.limit)

      const results = await ctx.prisma.feedback.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: input.includeUser,
        },
        skip: (input.page - 1) * input.limit,
        take: input.limit,
      })
      return { totalCount, pageCount, page: input.page, limit: input.limit, results }
    }),
  deleteFeedbackById: t.procedure
    .use(logRequest)
    .use(authenticate)
    .use(adminAccess)
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input: input }) => {
      await ctx.prisma.feedback.delete({
        where: { id: input.id },
      })
    }),
  submitFeedback: t.procedure
    .use(logRequest)
    .input(
      z.object({
        type: z.string().min(1),
        summary: z.string().min(1).max(500),
        problem: z.string().min(1).max(1000),
        solution: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.feedback.create({
        data: {
          type: input.type,
          summary: input.summary,
          problem: input.problem,
          solution: input.solution,
          userId: ctx.session?.userId,
        },
      })
    }),
})
