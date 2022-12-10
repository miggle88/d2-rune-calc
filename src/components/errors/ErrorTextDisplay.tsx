type ErrorTextDisplayProps = {
  message?: string
}

const ErrorTextDisplay = (props: ErrorTextDisplayProps) => {
  if (!props.message) {
    return <></>
  }
  return <div className={'text-2xl'}>{props.message}</div>
}

export default ErrorTextDisplay
