import { FC } from 'react';

import styles from './background.module.css';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

const Background: FC<Props> = (props) => {
  return (
    <div
      className={props.isActive ? styles.active : styles.notActive}
      onClick={props.onClick}
    ></div>
  );
};

export default Background;
