import { FC, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Items from './items/items';
import { ItemData } from '@/models/Item-Type';

import styles from './section-list.module.css';

type Props = {
  endpoint: string;
  sectionName: string;
  toLink: string;
};

interface Data {
  data: ItemData[];
}

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject({ status: res.status, message: res.statusText })
  );

const SectionList: FC<Props> = (props) => {
  const { data, error, isLoading, mutate } = useSWR<Data>(
    `https://api.jikan.moe/v4/${props.endpoint}`,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  console.log(error);

  return (
    <div className={styles['section-list-container']}>
      <div className={styles['section-top']}>
        <h3 className={styles.title}>{props.sectionName}</h3>
        <Link href={`search/${props.toLink}?page=1`}>
          <h4 className={styles.forMore}>See More</h4>
        </Link>
      </div>
      {(!error || error.status === 429) && (
        <Items arrItems={data?.data} isLoading={isLoading} />
      )}
      {error && error.status !== 429 && <p>{error.message}</p>}
    </div>
  );
};

export default SectionList;
