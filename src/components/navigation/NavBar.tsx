import NavBarItem from '@/components/navigation/NavBarItem'

const NavBar = () => {
  return (
    <div
      className={
        'w-screen flex flex-row justify-between border-b-2 border-gray-500'
      }
    >
      <NavBarItem href={'/'}>Home</NavBarItem>
      <NavBarItem href={'/runewords'}>Runewords</NavBarItem>
      <NavBarItem href={'/calc'}>Calc</NavBarItem>
      <NavBarItem href={'/profiles'}>Profiles</NavBarItem>
      <NavBarItem href={'/feedback'}>Feedback</NavBarItem>
    </div>
  )
}

export default NavBar
