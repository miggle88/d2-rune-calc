import SelectableChoice from '@/components/common/SelectableChoice'

type MultiSelectGroupProps = {
  selected: string[]
  choices: string[]
  onChange?: (selected: string[]) => void
}

const MultiSelectGroup = (props: MultiSelectGroupProps) => {
  const onChoiceChanged = (choice: string, isChecked: boolean) => {
    let selected = props.selected ?? []

    if (isChecked) {
      selected = [...selected, choice]
    } else {
      selected = selected.filter((value) => value !== choice)
    }
    props.onChange?.(selected)
  }

  return (
    <div className={'flex flex-row justify-evenly p-2'}>
      {props.choices.map((choice) => {
        return (
          <SelectableChoice
            key={choice}
            isChecked={props.selected.includes(choice)}
            onChange={(isChecked) => {
              onChoiceChanged(choice, isChecked)
            }}
          >
            {choice.toString()}
          </SelectableChoice>
        )
      })}
    </div>
  )
}

export default MultiSelectGroup
