import Conditional from '@/components/layout/Conditional'

type CheckboxProps = {
  checked: boolean
  label?: string
  className?: string
  onChange?: (checked: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={props.className ?? ''}>
      <input
        type={'checkbox'}
        checked={props.checked}
        className={'text-red-600 bg-red-800 border-red-500 border-2 rounded p-3 focus:border-red-500 focus:ring-0'}
        onChange={(e) => props.onChange?.(e.target.checked)}
      />
      <Conditional condition={props.label != null}>
        <span className={'text-xl px-3 py-1 text-center align-middle'}>{props.label}</span>
      </Conditional>
    </div>
  )
}

export default Checkbox
