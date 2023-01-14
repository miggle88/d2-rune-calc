import Button from '@/components/common/Button'
import { ReactNode } from 'react'

type ModalProps = {
  title: string
  children: ReactNode
  buttonText?: string
  className?: string
  // If true, the modal will be shown
  show: boolean
  disabled?: boolean
  onSubmit?: () => void
  onClose?: () => void
}

const Modal = (props: ModalProps) => {
  if (!props.show) {
    return null
  }
  return (
    <div className={'bg-gray-800 p-3 m-6 rounded-md w-2/3 flex flex-col'}>
      <div className={'flex flex-row'}>
        <div className={'text-center text-red-500 p-3 text-2xl w-full'}>{props.title}</div>
        <div>
          <Button className={'w-[48px]'} onClick={() => props.onClose && props.onClose()}>
            ❌
          </Button>
        </div>
      </div>
      <div className={'p-3'}>{props.children}</div>
      <div className={'text-center'}>
        <Button
          className={'min-w-[120px]'}
          disabled={props.disabled}
          onClick={() => props.onSubmit && props.onSubmit()}
        >
          {props.buttonText ?? 'Close'}
        </Button>
      </div>
    </div>
  )
}

export default Modal
