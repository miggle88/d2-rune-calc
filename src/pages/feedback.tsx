import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useUserSession from '@/hooks/useUserSession'
import { trpc } from '@/utils/trpc'
import FeedbackForm from '@/components/feedback/FeedbackForm'

const Feedback: NextPage = () => {
  const router = useRouter()
  const { data: session } = useUserSession()
  const [issueType, setIssueType] = useState('bug')
  const [issueSummary, setIssueSummary] = useState('')
  const [issueProblem, setIssueProblem] = useState('')
  const [issueSolution, setIssueSolution] = useState('')

  const submitFeedback = trpc.submitFeedback.useMutation()

  if (!session?.isAdmin) {
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

  return <div>You are an admin</div>
}

export default Feedback
