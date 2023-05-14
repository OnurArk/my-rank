import { FC, useState } from 'react';
import Link from 'next/link';

import SearchBar from './searchbar/search-bar';
import MainNav from './main-nav/main-nav';
import Hamburger from './hamburger/hamburger';

import styles from './header.module.css';
import Background from './background/background';

type Props = {};

const Header: FC<Props> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleHamburger = () => {
    setIsActive((pre) => !pre);
  };

  return (
    <div className={styles['header-container']}>
      <Background isActive={isActive} onClick={toggleHamburger} />
      <Link href={{ pathname: '/' }} className={styles.link}>
        <h1 className={styles.logo}>My Rank</h1>
      </Link>
      <SearchBar />

      <Hamburger isActive={isActive} onClick={toggleHamburger} />

      <MainNav isActive={isActive} />
    </div>
  );
};

export default Header;
