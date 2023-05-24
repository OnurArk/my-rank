import { FC } from 'react';
import useSWR from 'swr';

import Card from './card/card';
import Pagination from '../pagination/pagination';
import LoadingImg from '../loading-img/loading-img';

import { ItemData, PaginationData } from '@/models/Item-Type';
import styles from './items-list.module.css';

interface Data {
  data: ItemData[];
  pagination: PaginationData;
}

type Props = {
  endPoint: string;
  query: { q?: string };
  imgWidth?: number;
  limit: number;
  title: string;
  path: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

let linkTo: string;

const ItemsList: FC<Props> = (props) => {
  linkTo = props.path;

  const {
    data: searchData,
    error,
    isLoading,
  } = useSWR<Data>(`https://api.jikan.moe/v4/${props.endPoint}`, fetcher);

  if (searchData?.data && searchData.data.length <= 0) {
    return (
      <div className={styles['items-container']}>
        <p className={styles.noResult}>{`There Is No Result with "${
          props.query?.q ? props.query.q : 'Your'
        }" Entery`}</p>
      </div>
    );
  }

  if (error) return <div>Failed to load</div>;

  return (
    <div className={styles['items-container']}>
      {props?.title && (
        <h2 className={styles.title}>
          {props.title
            .split(/[-\s]/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') +
            `${
              props.query.q
                ? ': ' +
                  props.query.q
                    .split(/[-\s]/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : ''
            }`}
        </h2>
      )}
      <div className={styles.items}>
        {!isLoading &&
          searchData?.data?.map((item) => (
            <Card data={item} key={item.mal_id} width={props.imgWidth} />
          ))}

        {props.limit &&
          isLoading &&
          Array.from({ length: props.limit }).map((_, index) => (
            <LoadingImg key={index} width={props.imgWidth} />
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
            linkTo={linkTo}
          />
        )}
    </div>
  );
};

export default ItemsList;
