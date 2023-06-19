import { CSSProperties, FC } from 'react';

import styles from './loading-skeleton.module.css';

type Props = {
  width?: number;
  className?: string;
  containerClassName?: string;
  lineNumber?: number;
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
    width: props?.width ? `${props.width}px` : 'auto',
    borderRadius: '5px',
  };

  const multipleLine = Array.from(
    { length: props.lineNumber || 1 },
    (_, index) => (
      <div
        className={`${props.className} ${styles.skeleton} ${styles.skeletonText}`}
        style={style}
        key={index}
      />
    )
  );

  return (
    <div
      className={`${props.containerClassName} ${styles['loading-text-container']}`}
    >
      {multipleLine}
    </div>
  );
};
