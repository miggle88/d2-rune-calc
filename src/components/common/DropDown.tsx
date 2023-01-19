import { ReactNode } from 'react'

type DropDownProps = {
  value: string
  children: ReactNode
  className?: string
  onChange?: (value: string) => void
}

const DEFAULT_STYLE =
  'border-red-600 border-2 rounded bg-black text-red-400 focus:appearance-none focus:ring-0 focus:border-red-400 min-h-[48px]'

const DropDown = (props: DropDownProps) => {
  return (
    <div className={'p-2'}>
      <select
        className={`${DEFAULT_STYLE} ${props.className}`}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {props.children}
      </select>
    </div>
  )
}

export default DropDown
