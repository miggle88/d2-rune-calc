import { ReactNode } from 'react'
import Link from 'next/link'

type NavBarItemProps = {
  href: string
  children: ReactNode
}

const NavBarItem = (props: NavBarItemProps) => {
  return (
    <Link href={props.href}>
      <button className={'inline-block px-6 py-3 text-2xl flex-grow hover:bg-gray-700 text-center'}>
        <a>{props.children}</a>
      </button>
    </Link>
  )
}

export default NavBarItem
