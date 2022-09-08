import assert from 'assert'
import React from 'react'

type MasterDetailLayoutProps = {
  children: React.ReactNode[]
}

const MasterDetailLayout = (props: MasterDetailLayoutProps) => {
  assert(props.children.length == 2, 'Only two children allowed')
  const [masterChild, detailChild] = props.children

  return (
    <div className={'h-screen w-screen flex flex-row'}>
      <div className={'w-1/3'}>{masterChild}</div>
      <div className={'w-2/3'}>{detailChild}</div>
    </div>
  )
}

export default MasterDetailLayout
