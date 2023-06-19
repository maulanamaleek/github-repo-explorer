import React from "react";
import './style.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
}

const Button = ({
  handleClick,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className="btn btn--full"
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button;