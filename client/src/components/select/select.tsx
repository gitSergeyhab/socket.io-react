import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Data } from "../../types";

const defaultOptionValue = {id: '', name: 'не выбран'}

type OptionProps = {
  option: Data;
}

function Option({option}: OptionProps) {
  // const isSelected = !!(selected && (option.id === selected?.id));
  return (
    <option  value={option.id}>{option.name}</option>
  )
}

type SelectProps = {
  options: Data[];
  setOption: Dispatch<SetStateAction<Data|null>>;
}

export function Select({options, setOption,}: SelectProps) {

  const optionElements = options.map((item) => <Option key={item.id} option={item}  />)

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const value = evt.target?.value;
    const newOption = options.find((item) => item.id === value);
    setOption(newOption || null);
  }

  return (
    <select onChange={handleChange} defaultValue=''>
      <option value='' disabled >не выбран</option>
      {optionElements}
    </select>
  )
}
