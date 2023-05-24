import { CSSProperties, FC } from 'react';

import styles from './loading-img.module.css';

type Props = {
  width?: number;
  className?: string;
};

const LoadingImg: FC<Props> = (props) => {
  const style: CSSProperties = {
    height: props.width ? props.width * 1.41 : '',
    minHeight: props.width ? props.width * 1.41 : '',
  };

  return (
    <div
      className={`${props.className} ${styles.skeleton}`}
      style={style}
    ></div>
  );
};

export default LoadingImg;
