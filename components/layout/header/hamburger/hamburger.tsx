import { FC } from 'react';

import styles from './hamburger.module.css';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

const Hamburger: FC<Props> = ({ isActive, onClick }) => {
  return (
    <div
      className={`${styles['hamburger-menu']} ${
        isActive ? styles.active : null
      }`}
      onClick={onClick}
    >
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
      <span className={styles.span}></span>
    </div>
  );
};

export default Hamburger;
