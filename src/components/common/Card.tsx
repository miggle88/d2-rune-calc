import Conditional from '@/components/layout/Conditional'
import React from 'react'

type CardProps = {
  title?: string
  children?: React.ReactNode
}

const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col flex-wrap-auto bg-gray-800 rounded-2xl border-2 border-gray-700 p-2 w-full h-full">
      <Conditional condition={props.title != null}>
        <div className="text-4xl text-center p-4 text-red-500">{props.title}</div>
        <div className="bg-gray-700 h-1 mx-4" />
      </Conditional>
      {props.children}
    </div>
  )
}

export default Card
