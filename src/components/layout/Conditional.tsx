import { ReactNode } from 'react'

type ConditionalProps = {
  children: ReactNode
  condition: boolean | (() => boolean)
}

const Conditional = (props: ConditionalProps) => {
  if (typeof props.condition === 'boolean' && !props.condition) {
    return <></>
  }
  if (typeof props.condition === 'function' && !props.condition()) {
    return <></>
  }

  return <>{props.children}</>
}

export default Conditional
