import ToggleButton from '@/components/common/ToggleButton'
import { ReactNode } from 'react'

type SelectableChoiceProps = {
  children: ReactNode
  isChecked: boolean
  onChange?: (isChecked: boolean) => void
}

const COMMON_STYLE = 'inline-block px-2 py-1 m-1 border-2 rounded-2xl text-md min-w-[50px]'
const NORMAL_STYLE = 'bg-gray-700 border-gray-500 text-gray-400'
const SELECTED_STYLE = 'bg-red-600 border-red-400 text-red-200'

const SelectableChoice = (props: SelectableChoiceProps) => {
  return (
    <div>
      <ToggleButton
        className={`${COMMON_STYLE} ${NORMAL_STYLE}`}
        activeClassName={`${COMMON_STYLE} ${SELECTED_STYLE}`}
        isChecked={props.isChecked}
        onChange={props.onChange}
      >
        {props.children}
      </ToggleButton>
    </div>
  )
}

export default SelectableChoice
