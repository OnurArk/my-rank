import {
  FC,
  ComponentPropsWithRef,
  forwardRef,
  MouseEvent,
  CSSProperties,
  useState,
} from 'react';

import styles from './button.module.css';

type PropsButton = ComponentPropsWithRef<'button'>;

let styleLight: CSSProperties;

const Button: FC<PropsButton> = forwardRef((props, ref) => {
  const [lightLeft, setLightLeft] = useState<any>();

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const { clientX } = event;

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonLeft = buttonRect.left;

    const newLightLeft = clientX - buttonLeft;
    console.log(newLightLeft);
    setLightLeft(newLightLeft);
  };

  const styleLight: CSSProperties = {
    left: lightLeft,
  };

  const handleOnMouseLeave = () => {
    setLightLeft(null);
  };

  return (
    <button
      onClick={props.onClick}
      className={`${props.className} ${styles.btn}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleOnMouseLeave}
    >
      {props.children}
      <div className={styles.bottomLight} style={styleLight} />
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
