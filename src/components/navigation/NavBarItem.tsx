import React from 'react'
import Link from 'next/link'

type NavBarItemProps = {
  href: string
  children: React.ReactNode
}

const NavBarItem = (props: NavBarItemProps) => {
  return (
    <Link href={props.href}>
      <div className={'inline-block px-6 py-3 text-2xl flex-grow hover:bg-gray-700 text-center cursor-pointer'}>
        <a>{props.children}</a>
      </div>
    </Link>
  )
}

export default NavBarItem
