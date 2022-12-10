import Button from '@/components/common/Button'
import DropDown from '@/components/common/DropDown'
import TextPrompt from '@/components/common/TextPrompt'
import ErrorTextDisplay from '@/components/errors/ErrorTextDisplay'
import Conditional from '@/components/layout/Conditional'
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
  lastErrorMessage?: string
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const [issueType, setIssueType] = useState('bug')
  const [issueSummary, setIssueSummary] = useState('')
  const [issueProblem, setIssueProblem] = useState('')
  const [issueSolution, setIssueSolution] = useState('')

  const isSummaryInvalid = issueSummary.length < 1 || issueSummary.length > 500
  const isProblemInvalid = issueProblem.length < 1 || issueProblem.length > 1000
  const isSolutionInvalid = issueSolution.length < 1 || issueSolution.length > 1000

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
      <Conditional condition={isSummaryInvalid}>
        <div className={'text-gray-500 min-w-[600px]'}>Summary must between 1 and 500 characters</div>
      </Conditional>
      <TextPrompt
        prompt={'Describe what is not working or missing'}
        value={issueProblem}
        placeholder={'Insert text here'}
        className={'min-w-[600px]'}
        onChange={setIssueProblem}
        isTextArea={true}
      />
      <Conditional condition={isProblemInvalid}>
        <div className={'text-gray-500 min-w-[600px]'}>Problem must between 1 and 1000 characters</div>
      </Conditional>
      <TextPrompt
        prompt={'Describe what function is expected'}
        value={issueSolution}
        placeholder={'Insert text here'}
        className={'min-w-[600px]'}
        onChange={setIssueSolution}
        isTextArea={true}
      />
      <Conditional condition={isSolutionInvalid}>
        <div className={'text-gray-500 min-w-[600px]'}>Solution must between 1 and 1000 characters</div>
      </Conditional>
      <div className={'py-2'} />
      <Button
        className={'m-2'}
        disabled={!props.isEnabled || isSummaryInvalid || isProblemInvalid || isSolutionInvalid}
        onClick={() => {
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
      <Conditional condition={props.lastErrorMessage != null}>
        <ErrorTextDisplay message={'An internal error has occurred. Please try again.'} />
      </Conditional>
    </div>
  )
}

export default FeedbackForm
