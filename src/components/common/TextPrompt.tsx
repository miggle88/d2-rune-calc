import Conditional from '@/components/layout/Conditional'

type TextPromptProps = {
  prompt: string
  value: string
  placeholder?: string
  className?: string
  isTextArea?: boolean
  onChange?: (value: string) => void
}
const DEFAULT_STYLE =
  'border-gray-500 border-2 bg-gray-700 text-white min-w-[400px] focus:border-gray-200 focus:appearance-none focus:ring-0'

const TextPrompt = (props: TextPromptProps) => {
  return (
    <div className={'p-2'}>
      <div className={'py-1 text-2xl'}>{props.prompt}</div>
      <Conditional condition={!props.isTextArea}>
        <input
          type={'text'}
          className={`${DEFAULT_STYLE} ${props.className}`}
          value={props.value}
          onChange={(e) => props.onChange && props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
      </Conditional>
      <Conditional condition={!!props.isTextArea}>
        <textarea
          className={`${DEFAULT_STYLE} ${props.className}`}
          onChange={(e) => props.onChange && props.onChange(e.target.value)}
          value={props.value}
          placeholder={props.placeholder}
        />
      </Conditional>
    </div>
  )
}

export default TextPrompt
