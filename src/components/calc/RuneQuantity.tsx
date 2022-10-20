import NumericInput from '@/components/common/NumericInput'
import Conditional from '@/components/layout/Conditional'

const NORMAL_STYLE = 'font-bold text-sm w-[36px] h-full p-0 border-gray-500'
const HOVER_STYLE = 'hover:border-gray-600 hover:bg-gray-800'
const ACTIVE_STYLE = 'active:bg-red-800 active:border-red-600'
const FOCUS_STYLE = ''

const BUTTON_STYLE = `${NORMAL_STYLE} ${HOVER_STYLE} ${ACTIVE_STYLE} ${FOCUS_STYLE} group-focus-within:border-red-600`

type RuneQuantityProps = {
  name: string
  amount: number
  onChange?: (value: number) => void
  isReadOnly?: boolean
}

const RuneQuantity = (props: RuneQuantityProps) => {
  const increment = (isShiftPressed: boolean) => {
    const newValue = props.amount + (isShiftPressed ? 10 : 1)
    if (props.onChange) {
      props.onChange(Math.min(newValue, 999))
    }
  }

  const decrement = (isShiftPressed: boolean) => {
    const newValue = props.amount - (isShiftPressed ? 10 : 1)
    if (props.amount > 0 && props.onChange) {
      props.onChange(Math.max(0, newValue))
    }
  }

  const TEXT_STYLE =
    props.amount > 0 ? 'font-bold text-white selection:bg-red/20' : 'text-gray-500 selection:bg-white/20'

  return (
    <div className={'flex flex-col'}>
      <div className={`text-center ${TEXT_STYLE}`}>{props.name.toUpperCase()}</div>
      <div
        className={'flex flex-row group justify-between border-gray-500 border-2 rounded focus-within:border-red-600'}
      >
        <Conditional condition={!props.isReadOnly}>
          <button className={`${BUTTON_STYLE} border-r-2 rounded-none`} onClick={(e) => decrement(e.shiftKey)}>
            <span>{'-'}</span>
          </button>
        </Conditional>
        <NumericInput
          minValue={0}
          maxValue={999}
          value={props.amount}
          className={`h-full w-full py-2 border-0 hover:border-0 focus:border-0 ${TEXT_STYLE}`}
          onChange={props.onChange}
        />
        <Conditional condition={!props.isReadOnly}>
          <button className={`${BUTTON_STYLE} border-l-2 rounded-none`} onClick={(e) => increment(e.shiftKey)}>
            <span>{'+'}</span>
          </button>
        </Conditional>
      </div>
    </div>
  )
}

export default RuneQuantity
