import { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import styles from './input.module.css';

type InputType = 'text' | 'number' | 'password' | 'email' | 'button';
type positionText = 'left' | 'right' | 'center';

interface IInputProps extends React.ComponentProps<'input'> {
  children?: ReactNode;
  type?: InputType;
  max?: number;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  positionText?: positionText;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

type RefType = HTMLInputElement;

const Input = forwardRef<RefType, IInputProps>((props, ref) => {
  const style: CSSProperties = {
    textAlign: props.positionText ? `${props.positionText}` : 'left',
  } as CSSProperties;

  return (
    <>
      {props.children && <label htmlFor={props.name}>{props.children}</label>}
      <input
        style={style}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        value={props.value}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
        ref={ref}
        max={props.max}
        className={`${props.className} ${styles.input}`}
        onKeyDown={props.onKeyDown}
      />
    </>
  );
});

Input.displayName = 'Input';

export default Input;
