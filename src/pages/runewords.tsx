import { useState } from 'react'
import type { NextPage } from 'next'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import SearchBar from '@/components/SearchBar'

const Runewords: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTermChanged = (newSearchTerm: string) => {
    console.log(`newSearchTerm: '${newSearchTerm}'`)
    setSearchTerm(newSearchTerm)
  }

  return (
    <MasterDetailLayout something={true}>
      <div id={'master'}>
        <SearchBar value={searchTerm} onChange={onSearchTermChanged} />
      </div>
      <div id={'detail'}>Detail View</div>
    </MasterDetailLayout>
  )
}

export default Runewords
