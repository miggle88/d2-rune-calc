import { MouseEventHandler, ReactNode } from 'react'

const NORMAL_STYLE = 'border-red-700 border-2 rounded bg-black p-2 text-center'
const HOVER_STYLE = 'hover:border-red-600 hover:bg-red-900 hover:text-red-500'
const ACTIVE_STYLE = 'active:border-red-500 active:bg-red-800 active:text-red-500'
const FOCUS_STYLE = 'focus:border-red-500 focus:bg-red-900'
const BUTTON_STYLE = `${NORMAL_STYLE} ${HOVER_STYLE} ${ACTIVE_STYLE} ${FOCUS_STYLE}`

type ButtonProps = {
  className?: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${BUTTON_STYLE} ${props.className ?? ''}`} onClick={props.onClick}>
      {props.children}
      {props.children}
    </button>
  )
}

export default Button
