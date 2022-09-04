import MultiSelectGroup from '@/components/MultiSelectGroup'
import { ItemSubType, ItemType } from '@/types'
import { useState } from 'react'
import type { NextPage } from 'next'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import SearchBar from '@/components/SearchBar'

const ALL_ITEM_TYPES = Object.values(ItemType)
const ALL_SUB_TYPES = Object.values(ItemSubType)

const Runewords: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemTypeFilters, setItemTypeFilters] = useState([] as string[])
  const [subTypeFilters, setSubTypeFilters] = useState([] as string[])

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }
  const onItemTypeFilterChanged = (selected: string[]) => {
    setItemTypeFilters(selected)
    console.log(`${selected} was selected`)
  }
  const onSubTypeFilterChanged = (selected: string[]) => {
    console.log(`${selected} was selected`)
    setSubTypeFilters(selected)
  }
  return (
    <MasterDetailLayout something={true}>
      <div id={'master'}>
        <SearchBar value={searchTerm} onChange={onSearchTermChanged} />
        <div className={'text-xl px-2 pt-2'}>Item Types</div>
        <MultiSelectGroup
          selected={itemTypeFilters}
          choices={ALL_ITEM_TYPES}
          onChange={onItemTypeFilterChanged}
        />
        <div className={'text-xl px-2 pt-2'}>Item Sub Types</div>
        <MultiSelectGroup
          selected={subTypeFilters}
          choices={ALL_SUB_TYPES}
          onChange={onSubTypeFilterChanged}
        />
      </div>
      <div id={'detail'}>Detail View</div>
    </MasterDetailLayout>
  )
}

export default Runewords
