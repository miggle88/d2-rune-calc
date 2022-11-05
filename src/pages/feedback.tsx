import FeedbackTable from '@/components/feedback/FeedbackTable'
import Conditional from '@/components/layout/Conditional'
import { useQueryClient } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useUserSession from '@/hooks/useUserSession'
import { trpc } from '@/utils/trpc'
import FeedbackForm from '@/components/feedback/FeedbackForm'

const Feedback: NextPage = () => {
  const router = useRouter()
  const { data: session } = useUserSession()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const isAdmin = session?.isAdmin ?? false

  const queryClient = useQueryClient()
  const listFeedback = trpc.listFeedback.useQuery({ page, limit }, { enabled: isAdmin })
  const submitFeedback = trpc.submitFeedback.useMutation()
  const deleteFeedback = trpc.deleteFeedbackById.useMutation()

  // Use is not admin, show the feedback form
  if (!isAdmin) {
    return (
      <FeedbackForm
        isEnabled={!submitFeedback.isLoading}
        onSubmit={(data) => {
          submitFeedback.mutate(data, {
            onSuccess: () => {
              router.push('/feedback/thanks')
            },
          })
        }}
      />
    )
  }

  // User is an admin, show the feedback table
  return (
    <div>
      <div className={'text-center text-2xl py-3'}>Feedback from Users</div>
      <FeedbackTable
        rows={listFeedback.data?.results ?? []}
        onDelete={(id) => {
          deleteFeedback.mutate(
            { id },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['listFeedback'] })
              },
            }
          )
        }}
      />
    </div>
  )
}

export default Feedback
