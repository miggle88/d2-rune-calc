import { clamp } from '@/utils/math'
import { ChangeEvent } from 'react'

const INPUT_STYLE =
  'border-gray-600 border-2 rounded bg-gray-900 ring-0 text-center focus:appearance-none focus:ring-0 focus:border-red-500 selection:bg-red-600/50'

type NumericInputProps = {
  className?: string
  value: string | number
  minValue?: number
  maxValue?: number
  onChange?: (value: number) => void
  onInvalid?: (stringValue: string) => void
}

const NumericInput = (props: NumericInputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      props.onChange?.(props.minValue ?? 0)
      return
    }

    const newValue = parseInt(e.target.value, 10)
    if (!Number.isInteger(newValue)) {
      props.onInvalid?.(e.target.value)
      return
    }

    if (props.onChange) {
      const minValue = props.minValue ?? -Infinity
      const maxValue = props.maxValue ?? +Infinity
      props.onChange(clamp(newValue, minValue, maxValue))
    }
  }

  return (
    <input
      type={'text'}
      value={props.value}
      className={`${INPUT_STYLE} ${props.className ?? ''}`}
      onChange={handleOnChange}
    />
  )
}

export default NumericInput
