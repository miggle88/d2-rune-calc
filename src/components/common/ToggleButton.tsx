import { ReactNode } from 'react'

type ToggleButtonProps = {
  children: ReactNode
  className?: string
  activeClassName?: string
  isChecked: boolean
  onChange?: (isChecked: boolean) => void
}

const ToggleButton = (props: ToggleButtonProps) => {
  const style = props.isChecked ? props.activeClassName : props.className

  return (
    <div>
      <button
        className={style}
        onClick={() => {
          props.onChange && props.onChange(!props.isChecked)
        }}
      >
        {props.children}
      </button>
    </div>
  )
}

export default ToggleButton
