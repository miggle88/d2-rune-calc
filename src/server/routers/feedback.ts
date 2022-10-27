import logRequest from '@/server/middlewares/logRequest'
import { t } from '@/server/trpc'
import { z } from 'zod'

export const feedbackRouter = t.router({
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
