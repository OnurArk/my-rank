import { FC } from 'react';
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SectionList: FC<Props> = (props) => {
  const { data, error, isLoading } = useSWR<Data>(
    `https://api.jikan.moe/v4/${props.endpoint}`,
    fetcher
  );

  return (
    <div className={styles['section-list-container']}>
      <div className={styles['section-top']}>
        <h3 className={styles.title}>{props.sectionName}</h3>
        <Link href={`search/${props.toLink}?page=1`}>
          <h4 className={styles.forMore}>See More</h4>
        </Link>
      </div>
      {!error && <Items arrItems={data?.data} isLoading={isLoading} />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SectionList;
