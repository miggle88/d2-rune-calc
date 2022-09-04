import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SearchBar from '@/components/common/SearchBar'
import MultiSelectGroup from '@/components/common/MultiSelectGroup'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import RunewordList from '@/components/runewords/RunewordList'
import AllRunewords from '@/data/runewords'
import { ItemSubType, ItemType, Runeword } from '@/types'
import { hasCommonElement } from '@/utils/arrays'
import { runewordSorter } from '@/utils/sorting'

const ALL_ITEM_TYPES = Object.values(ItemType)
const ALL_SUB_TYPES = Object.values(ItemSubType)
const ALL_SOCKET_FILTERS = ['2', '3', '4', '5', '6']

const Runewords: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemTypeFilters, setItemTypeFilters] = useState([] as string[])
  const [subTypeFilters, setSubTypeFilters] = useState([] as string[])
  const [socketFilters, setSocketFilters] = useState([] as string[])
  const [filteredRunewords, setFilteredRunewords] = useState([...AllRunewords])

  useEffect(() => {
    const newFilteredRunewordList = AllRunewords.filter((runeword) => {
      if (!runeword.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (itemTypeFilters.length > 0 && !hasCommonElement(runeword.types, itemTypeFilters)) {
        return false
      }
      if (subTypeFilters.length > 0 && runeword.subTypes && !hasCommonElement(runeword.subTypes, subTypeFilters)) {
        return false
      }
      if (socketFilters.length > 0 && !hasCommonElement([runeword.runes.length.toString()], socketFilters)) {
        return false
      }

      return true
    })
    newFilteredRunewordList.sort(runewordSorter)
    setFilteredRunewords(newFilteredRunewordList)
  }, [searchTerm, itemTypeFilters, subTypeFilters, socketFilters])

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }
  const onItemTypeFilterChanged = (selected: string[]) => {
    setItemTypeFilters(selected)
    console.log(`itemTypeFilters: [${selected}]`)
  }

  const onSubTypeFilterChanged = (selected: string[]) => {
    console.log(`subTypeFilters: [${selected}]`)
    setSubTypeFilters(selected)
  }

  const onSocketFilterChanged = (selected: string[]) => {
    console.log(`socketFilters: [${selected}]`)
    setSocketFilters(selected)
  }

  const onRunewordClicked = (runeword: Runeword) => {
    console.log(`runewordClicked: ${runeword.name}`)
  }

  return (
    <MasterDetailLayout something={true}>
      <div id={'master'} className={'border-gray-500 border-r-2'}>
        <SearchBar value={searchTerm} onChange={onSearchTermChanged} />
        <div className={'text-xl px-2 pt-2'}>Item Types</div>
        <MultiSelectGroup selected={itemTypeFilters} choices={ALL_ITEM_TYPES} onChange={onItemTypeFilterChanged} />
        <div className={'text-xl px-2 pt-2'}>Item Sub Types</div>
        <MultiSelectGroup selected={subTypeFilters} choices={ALL_SUB_TYPES} onChange={onSubTypeFilterChanged} />
        <div className={'text-xl px-2 pt-2'}>Sockets</div>
        <MultiSelectGroup selected={socketFilters} choices={ALL_SOCKET_FILTERS} onChange={onSocketFilterChanged} />
        <div className={'border-gray-500 border-b-2'} />
        <RunewordList runewords={filteredRunewords} onClick={onRunewordClicked} />
      </div>
      <div id={'detail'}>Detail View</div>
    </MasterDetailLayout>
  )
}

export default Runewords
