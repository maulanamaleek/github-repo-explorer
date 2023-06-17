import React from "react";
import './style.scss';

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  handleChange: (val: string) => void;
}
const TextInput = ({
  value,
  handleChange,
  ...props
}: ITextInputProps) => {
  return (
    <input
      className="input input--full"
      {...props}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      type="text"
    />
  )
}

export default TextInput