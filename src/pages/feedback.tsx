import Button from '@/components/common/Button'
import DropDown from '@/components/common/DropDown'
import TextPrompt from '@/components/common/TextPrompt'
import type { NextPage } from 'next'
import { useState } from 'react'

const Feedback: NextPage = () => {
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
          console.log(issueType)
          console.log(issueSummary)
          console.log(issueProblem)
          console.log(issueSolution)
        }}
      >
        Submit
      </Button>
      <div></div>
    </div>
  )
}

export default Feedback
