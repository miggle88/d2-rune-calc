import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import type { GetServerSidePropsContext, NextPage } from 'next'
import SearchBar from '@/components/common/SearchBar'
import MultiSelectGroup from '@/components/common/MultiSelectGroup'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'
import RunewordList from '@/components/runewords/RunewordList'
import RunewordDetail from '@/components/runewords/RunewordDetail'
import useSearchQuery from '@/hooks/useSearchQuery'
import AllRunewords from '@/data/runewords'
import { ItemSubType, ItemType, Runeword } from '@/types'
import { hasCommonElement } from '@/utils/arrays'
import { runewordSorter } from '@/utils/sorting'

const ALL_ITEM_TYPES = Object.values(ItemType)
const ALL_SUB_TYPES = Object.values(ItemSubType)
const ALL_SOCKET_FILTERS = ['2', '3', '4', '5', '6']

type RunewordsContext = {
  query: ParsedUrlQuery
}

const Runewords: NextPage<RunewordsContext> = (context) => {
  const { setQuery } = useSearchQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [itemTypeFilters, setItemTypeFilters] = useState<string[]>([])
  const [subTypeFilters, setSubTypeFilters] = useState<string[]>([])
  const [socketFilters, setSocketFilters] = useState<string[]>([])
  const [filteredRunewords, setFilteredRunewords] = useState<Runeword[]>([...AllRunewords])
  const [selectedRuneword, setSelectedRuneword] = useState<Runeword | undefined>()

  useEffect(() => {
    const { selected, term, types, subTypes, sockets } = context.query
    if (typeof selected === 'string' && selected.trim()) {
      const runeword = AllRunewords.find((r) => slugify(r.name).toLowerCase() === selected)
      if (runeword) {
        console.log(`setting selected runeword to '${runeword.name}' (${selected})`)
        setSelectedRuneword(runeword)
      }
    }
    if (typeof term === 'string' && term.trim()) {
      console.log(`setting search term to '${term}'`)
      setSearchTerm(term)
    }
    if (typeof types === 'string' && types.trim()) {
      console.log(`setting type filters to '${types}'`)
      setItemTypeFilters(types.split(','))
    }
    if (typeof subTypes === 'string' && subTypes.trim()) {
      console.log(`setting subType filters to '${subTypes}'`)
      setSubTypeFilters(subTypes.split(','))
    }
    if (typeof sockets === 'string' && sockets.trim()) {
      console.log(`setting socket filters to '${sockets}'`)
      setSocketFilters(sockets.split(','))
    }
  }, [])

  useEffect(() => {
    const newFilteredRunewordList = AllRunewords.filter((runeword) => {
      if (!runeword.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (itemTypeFilters.length > 0 && !hasCommonElement(runeword.types, itemTypeFilters)) {
        return false
      }
      if (subTypeFilters.length > 0 && (!runeword.subTypes || !hasCommonElement(runeword.subTypes, subTypeFilters))) {
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

  useEffect(() => {
    setQuery({
      selected: selectedRuneword ? slugify(selectedRuneword.name).toLowerCase() : null,
      term: searchTerm,
      types: itemTypeFilters.join(','),
      subTypes: subTypeFilters.join(','),
      sockets: socketFilters.join(','),
    })
  }, [selectedRuneword, searchTerm, itemTypeFilters, subTypeFilters, socketFilters])

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }
  const onItemTypeFilterChanged = (selected: string[]) => {
    setItemTypeFilters(selected)
  }

  const onSubTypeFilterChanged = (selected: string[]) => {
    setSubTypeFilters(selected)
  }

  const onSocketFilterChanged = (selected: string[]) => {
    setSocketFilters(selected)
  }

  const onRunewordClicked = (runeword: Runeword) => {
    setSelectedRuneword(runeword)
  }

  return (
    <MasterDetailLayout>
      <div className={'border-gray-500 border-r-2 h-screen'}>
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
      <div className={'h-screen'}>
        <RunewordDetail runeword={selectedRuneword} />
      </div>
    </MasterDetailLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query
  return {
    props: {
      query,
    },
  }
}

export default Runewords
