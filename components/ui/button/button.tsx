import { FC, ComponentPropsWithRef, forwardRef } from 'react';

import styles from './button.module.css';

type PropsButton = ComponentPropsWithRef<'button'>;

const Button: FC<PropsButton> = forwardRef((props, ref) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} ${styles.btn}`}
      ref={ref}
    >
      {props.children}
      <div className={styles.bottomLight} />
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
