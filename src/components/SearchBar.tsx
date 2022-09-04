type SearchBarProps = {
  value?: string
  onChange?: (value: string) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className={'bg-sky-500 flex flex-row border-b-2 border-gray-500'}>
      <input
        type={'text'}
        className={
          'flex-grow p-3 appearance-none border-0 focus:ring-0 bg-gray-800 placeholder-gray-500'
        }
        value={props.value ?? ''}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
        placeholder={'Search...'}
      />
      <button
        className={
          'min-w-[48px] min-h-[32px] appearance-none bg-gray-600 hover:bg-gray-500 active:bg-gray-400'
        }
        onClick={() => props.onChange && props.onChange('')}
      >
        X
      </button>
    </div>
  )
}

export default SearchBar
