import { ReactNode } from 'react'

type DropDownProps = {
  value: string
  children: ReactNode
  className?: string
  onChange?: (value: string) => void
}

const DEFAULT_STYLE =
  'border-gray-500 border-2 bg-gray-700 text-white focus:border-gray-200 focus:appearance-none focus:ring-0'

const DropDown = (props: DropDownProps) => {
  return (
    <div className={'p-2'}>
      <select
        className={`${DEFAULT_STYLE} ${props.className}`}
        value={props.value}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
      >
        {props.children}
      </select>
    </div>
  )
}

export default DropDown
