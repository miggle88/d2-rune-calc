import type { NextPage } from 'next'
import MasterDetailLayout from '@/components/layout/MasterDetailLayout'

const Runewords: NextPage = () => {
  return (
    <MasterDetailLayout something={true}>
      <div className={'text-3xl bg-sky-700'}>Master View</div>
      <div className={'text-3xl bg-amber-700'}>Detail View</div>
    </MasterDetailLayout>
  )
}

export default Runewords
