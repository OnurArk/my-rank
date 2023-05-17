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
  path: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

let linkTo: string;

const ItemsList: FC<Props> = (props) => {
  linkTo = props.path.replace(/&?page=\d+/, '').trim();
  console.log(props.path);

  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR<Data>(
    `https://api.jikan.moe/v4/${props.path ? props.path : 'anime'}`,
    fetcher
  );

  if (searchData?.data && searchData.data.length <= 0) {
    return (
      <div className={styles['items-container']}>
        <p className={styles.noResult}>{`There Is No Result with "" Entery`}</p>
      </div>
    );
  }

  if (error) return <div>Failed to load</div>;

  return (
    <div className={styles['items-container']}>
      <div className={styles.items}>
        {searchData?.data?.map((item) => (
          <Card data={item} key={item.mal_id} />
        ))}
      </div>
      {searchData?.pagination?.last_visible_page &&
        searchData?.pagination?.last_visible_page > 1 && (
          <Pagination
            pageNum={
              searchData?.pagination?.last_visible_page
                ? searchData?.pagination.last_visible_page
                : null
            }
            currentPage={
              searchData?.pagination?.current_page
                ? searchData?.pagination.current_page
                : null
            }
            linkTo={`${linkTo}`}
          />
        )}
    </div>
  );
};

export default ItemsList;
