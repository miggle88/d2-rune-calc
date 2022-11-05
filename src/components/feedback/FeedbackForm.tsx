import Button from '@/components/common/Button'
import DropDown from '@/components/common/DropDown'
import TextPrompt from '@/components/common/TextPrompt'
import { useState } from 'react'

export type FeedbackSubmission = {
  type: string
  summary: string
  problem: string
  solution: string
}

type FeedbackFormProps = {
  isEnabled: boolean
  onSubmit: (data: FeedbackSubmission) => void
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const [issueType, setIssueType] = useState('bug')
  const [issueSummary, setIssueSummary] = useState('')
  const [issueProblem, setIssueProblem] = useState('')
  const [issueSolution, setIssueSolution] = useState('')

  return (
    <div className={'p-3 flex flex-col place-items-center w-screen'}>
      <div className={'text-2xl'}>Please provide feedback on anything you like or dislike about the calculator.</div>
      <div className={'p-3'} />
      <div className={'text-2xl px-2'}>Type of feedback</div>
      <DropDown value={issueType} onChange={setIssueType} className={'min-w-[600px]'}>
        <option value={'bug'}>Bug</option>
        <option value={'feature'}>Feature Request</option>
        <option value={'improvement'}>Improvement</option>
        <option value={'other'}>Other</option>
      </DropDown>
      <TextPrompt
        prompt={'Briefly describe the issue'}
        value={issueSummary}
        placeholder={'Insert text here'}
        className={'min-w-[600px]'}
        onChange={setIssueSummary}
      />
      <TextPrompt
        prompt={'Describe what is not working or missing'}
        value={issueProblem}
        placeholder={'Insert text here'}
        className={'min-w-[600px]'}
        onChange={setIssueProblem}
        isTextArea={true}
      />
      <TextPrompt
        prompt={'Describe what function is expected'}
        value={issueSolution}
        placeholder={'Insert text here'}
        className={'min-w-[600px]'}
        onChange={setIssueSolution}
        isTextArea={true}
      />
      <div className={'py-2'} />
      <Button
        className={'m-2'}
        onClick={() => {
          if (!props.isEnabled) {
            return
          }
          props.onSubmit({
            type: issueType,
            summary: issueSummary,
            problem: issueProblem,
            solution: issueSolution,
          })
        }}
      >
        Submit Feedback
      </Button>
      <div></div>
    </div>
  )
}

export default FeedbackForm
