import React, { FC, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';

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
      memoizedRouter.push(`/search/anime?q=${query}&page=1`);
      queryRef.current.value = '';
    }
  };

  return (
    <form className={styles['search-bar-container']} onSubmit={searchHandler}>
      <input
        type='text'
        placeholder='Search for Anime'
        className={styles['search-bar']}
        ref={queryRef}
        defaultValue=''
      />
    </form>
  );
};

export default SearchBar;
