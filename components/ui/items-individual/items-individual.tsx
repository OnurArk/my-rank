import { FC } from 'react';
import useSWR from 'swr';

import CardWild from './card-wild/card-wild';

import { ItemData } from '@/models/Item-Data';
import styles from './items-individual.module.css';

interface Data {
  data: ItemData[];
}

type Props = {
  query?: any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ItemsIndividual: FC<Props> = (props) => {
  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR<Data>(
    `https://api.jikan.moe/v4/anime?q=${props.query}&sfw`,
    fetcher
  );

  console.log(searchData);

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
      {searchData?.data.map((item) =>
        item.approved ? <CardWild data={item} key={item.mal_id} /> : null
      )}
    </div>
  );
};

export default ItemsIndividual;
