const BUTTON_STYLE =
  'font-bold text-2xl p-0 border-gray-500 border-2 rounded bg-gray-800 text-gray-400 hover:bg-gray-600 active:bg-gray-400 active:text-gray-200 h-[36px] w-[24px]'

type RuneQuantityProps = {
  name: string
  amount: number
  onChange?: (value: number) => void
}

const RuneQuantity = (props: RuneQuantityProps) => {
  const increment = () => {
    if (props.onChange) {
      props.onChange(props.amount + 1)
    }
  }

  const decrement = () => {
    if (props.amount > 0 && props.onChange) {
      props.onChange(props.amount - 1)
    }
  }
  return (
    <div className={'flex flex-col'}>
      <div className={'text-center font-bold'}>{props.name}</div>
      <div className={'flex flex-row justify-between'}>
        <button className={BUTTON_STYLE} onClick={decrement}>
          {'-'}
        </button>
        <div className={'border-gray-700 border-2 px-4 py-0 rounded h-[36px]'}>
          <span className={'text-2xl text-center'}>{props.amount}</span>
        </div>
        <button className={BUTTON_STYLE} onClick={increment}>
          {'+'}
        </button>
      </div>
    </div>
  )
}

export default RuneQuantity
