import NavBarItem from '@/components/navigation/NavBarItem'
import ProfileNavBarItem from '@/components/navigation/ProfileNavBarItem'

const NavBar = () => {
  return (
    <div className={'w-screen flex flex-row justify-between border-b-2 border-gray-500'}>
      <NavBarItem href={'/'}>Home</NavBarItem>
      <NavBarItem href={'/runewords'}>Runewords</NavBarItem>
      <NavBarItem href={'/calc'}>Calc</NavBarItem>
      <NavBarItem href={'/profiles'}>Profiles</NavBarItem>
      <NavBarItem href={'/feedback'}>Feedback</NavBarItem>
      <ProfileNavBarItem />
    </div>
  )
}

export default NavBar
