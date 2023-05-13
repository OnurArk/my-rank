import { FC } from 'react';

import styles from './search-bar.module.css';

type Props = {};

const SearchBar: FC<Props> = (props) => {
  return (
    <div className={styles['search-bar-container']}>
      <input
        type='text'
        placeholder='Search for Anime or Character'
        className={styles['search-bar']}
      />
    </div>
  );
};

export default SearchBar;
