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

const Button: FC<PropsButton> = forwardRef((props, ref) => {
  const [lightLeft, setLightLeft] = useState<any>();
  const [lightTop, setLightTop] = useState<any>();

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = event;

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonLeft = buttonRect?.left;
    const buttonTop = buttonRect?.top;

    const newLightLeft = clientX - buttonLeft;
    const newLİghtTop = clientY - buttonTop;

    setLightLeft(newLightLeft);
    setLightTop(newLİghtTop);
  };

  const styleLight: CSSProperties = {
    left: lightLeft,
    top: lightTop,
  };

  return (
    <button
      onClick={props.onClick}
      className={`${props.className} ${styles.btn}`}
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <span className={styles.text}>{props.children}</span>
      <div className={styles.bottomLight} style={styleLight} />
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
