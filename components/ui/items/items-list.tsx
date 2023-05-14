import { FC } from 'react';
import useSWR from 'swr';

import Card from './card/card';

import { ItemData } from '@/models/Item-Data';
import styles from './items-list.module.css';

interface Data {
  data: ItemData[];
}

type Props = {
  query?: any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ItemsList: FC<Props> = (props) => {
  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR<Data>(
    `https://api.jikan.moe/v4/anime?q=${props.query}&sfw`,
    fetcher
  );

  if (searchData?.data && searchData.data.length <= 0) {
    return (
      <div className={styles['items-container']}>
        <p
          className={styles.noResult}
        >{`There Is No Result with "${props.query}" Entery`}</p>
      </div>
    );
  }

  return (
    <div className={styles['items-container']}>
      {searchData?.data.map((item) => (
        <Card data={item} key={item.mal_id} />
      ))}
    </div>
  );
};

export default ItemsList;
