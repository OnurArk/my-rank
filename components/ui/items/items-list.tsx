import { FC } from 'react';
import useSWR from 'swr';

import Card from './card/card';
import Pagination from '../pagination/pagination';

import { ItemData, PaginationData } from '@/models/Item-Type';
import styles from './items-list.module.css';

interface Data {
  data: ItemData[];
  pagination: PaginationData;
}

type Props = {
  query: {
    nameId?: string[];
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ItemsList: FC<Props> = (props) => {
  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR<Data>(
    `https://api.jikan.moe/v4/anime?q=${props.query.nameId?.[0]}&page=${props.query.nameId?.[1]}`,
    fetcher
  );

  if (searchData?.data && searchData.data.length <= 0) {
    return (
      <div className={styles['items-container']}>
        <p
          className={styles.noResult}
        >{`There Is No Result with "${props.query.nameId?.[0]}" Entery`}</p>
      </div>
    );
  }

  console.log(searchData);

  if (error) return <div>Failed to load</div>;

  return (
    <div className={styles['items-container']}>
      <div className={styles.items}>
        {searchData?.data.map((item) => (
          <Card data={item} key={item.mal_id} />
        ))}
      </div>
      {/* <Pagination
        pageNum={
          searchData?.pagination.last_visible_page
            ? searchData?.pagination.last_visible_page
            : null
        }
        currentPage={
          searchData?.pagination.current_page
            ? searchData?.pagination.current_page
            : null
        }
      /> */}

      <Pagination pageNum={5} currentPage={5} />
    </div>
  );
};

export default ItemsList;
