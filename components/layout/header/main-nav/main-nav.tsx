import { FC } from 'react';

import styles from './main-nav.module.css';

type Props = {
  isActive: boolean;
};

const MainNav: FC<Props> = (props) => {
  return (
    <div
      className={`${styles['main-nav']} ${
        props.isActive ? styles.active : null
      }`}
    >
      <p>MyRank</p>
      <p>Profile</p>
      <p>Logout</p>
    </div>
  );
};

export default MainNav;
