import { FC } from 'react';
import useSWR from 'swr';

import Items from './items/items';
import { ItemData } from '@/models/Item-Data';

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

  return (
    <div className={styles['section-list-container']}>
      <p className={styles.title}>{props.sectionName}</p>
      {!isLoading && !error && data && data.data && (
        <Items arrItems={data?.data} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SectionList;
