import { ReactNode, useRef } from 'react'

type ToggleButtonProps = {
  children: ReactNode
  className?: string
  activeClassName?: string
  onChange: (isChecked: boolean) => void
}

const ToggleButton = (props: ToggleButtonProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null)

  const style =
    checkboxRef.current && checkboxRef.current.checked
      ? props.activeClassName
      : props.className

  return (
    <div>
      <input
        ref={checkboxRef}
        type={'checkbox'}
        className={'appearance-none hidden'}
      />
      <button
        className={style}
        onClick={() => {
          if (checkboxRef.current) {
            checkboxRef.current.checked = !checkboxRef.current.checked
            props.onChange(checkboxRef.current.checked)
          }
        }}
      >
        {props.children}
      </button>
    </div>
  )
}

export default ToggleButton
