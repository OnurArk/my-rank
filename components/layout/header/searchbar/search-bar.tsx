import React, { FC, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './search-bar.module.css';

type Props = {};

const SearchBar: FC<Props> = (props) => {
  const queryRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const memoizedRouter = useMemo(() => router, [router]);

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = queryRef.current?.value;

    if (query) {
      memoizedRouter.push(`/search/search?q=${query}&page=1`);
      queryRef.current.value = '';
    }
  };

  return (
    <form className={styles['search-bar-container']} onSubmit={searchHandler}>
      <div className={styles['seach-Bar-Icon']}>
        <label htmlFor='search-bar'>
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        </label>
        <input
          type='text'
          placeholder='Search for Anime'
          className={styles['search-bar']}
          ref={queryRef}
          defaultValue=''
          id='search-bar'
        />
      </div>
    </form>
  );
};

export default SearchBar;
