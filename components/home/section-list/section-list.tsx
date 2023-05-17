import { FC } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Items from './items/items';
import { ItemData } from '@/models/Item-Type';

import styles from './section-list.module.css';

type Props = {
  endpoint: string;
  sectionName: string;
};

interface Data {
  data: ItemData[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SectionList: FC<Props> = (props) => {
  const { data, error, isLoading } = useSWR<Data>(
    `https://api.jikan.moe/v4/${props.endpoint}`,
    fetcher
  );

  const unlimitedHref = props.endpoint.includes('?limit=5')
    ? props.endpoint.replace('?limit=5', '').concat('?page=1')
    : props.endpoint.replace('&limit=5', '').concat('&page=1');

  return (
    <div className={styles['section-list-container']}>
      <div className={styles['section-top']}>
        <h3 className={styles.title}>{props.sectionName}</h3>
        <Link href={`search/${unlimitedHref}`}>
          <h4 className={styles.forMore}>See More</h4>
        </Link>
      </div>
      {!isLoading && !error && data && data.data && (
        <Items arrItems={data?.data} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SectionList;
