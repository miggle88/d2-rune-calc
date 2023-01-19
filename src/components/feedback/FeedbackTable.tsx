import Button from '@/components/common/Button'
import TrashCanSvg from '@svg/trash-can.svg'

export interface FeedbackTableRow {
  id: number
  type: string
  summary: string
  problem: string
  solution: string
  createdAt: Date
}

export type FeedbackTableProps = {
  rows?: FeedbackTableRow[]
  onDelete?: (id: number) => void
}

const FeedbackTable = (props: FeedbackTableProps) => {
  return (
    <div className={'flex flex-col'}>
      <table className={'text-center'}>
        <thead className={''}>
          <tr className={'border-white border-spacing-4 border-b-4'}>
            <th className={'text-xl'}>ID</th>
            <th className={'text-xl'}>Type</th>
            <th className={'text-xl'}>Summary</th>
            <th className={'text-xl'}>Problem</th>
            <th className={'text-xl'}>Solution</th>
            <th className={'text-xl'}>Created Date</th>
            <th className={'text-xl'}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={'p-2'}></td>
          </tr>
          {props.rows &&
            props.rows.map((row) => {
              return (
                <tr key={`feedback-${row.id}`} className={''}>
                  <td>{`ID ${row.id}`}</td>
                  <td>{row.type}</td>
                  <td>{row.summary}</td>
                  <td>{row.problem}</td>
                  <td>{row.solution}</td>
                  <td>{row.createdAt.toLocaleDateString()}</td>
                  <td>
                    <Button className={'text-red-500 hover:text-red-300 p-3'} onClick={() => props.onDelete?.(row.id)}>
                      <TrashCanSvg width={24} height={24} />
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable
