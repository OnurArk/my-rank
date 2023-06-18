import { CSSProperties, FC } from 'react';

import styles from './loading-skeleton.module.css';

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

export const LoadingImg: FC<Props> = (props) => {
  const style: CSSProperties = props?.width
    ? { height: props.width * 1.41, minHeight: props.width * 1.41 }
    : {};

  return (
    <div className={`${props.className} ${styles.skeleton}`} style={style} />
  );
};

export const LoadingText: FC<Props> = (props) => {
  const style: CSSProperties = {
    width: props?.width ? `${props.width}px` : '10vw',
    height: props?.height ? `${props.height}rem` : '1rem',
    borderRadius: '15px',
  };

  return (
    <div className={`${props.className} ${styles.skeleton}`} style={style} />
  );
};
