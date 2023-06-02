import { FC } from 'react';

import Item from './item/item';
import LoadingImg from '@/components/ui/loading-img/loading-img';

import { ItemData } from '@/models/Item-Type';

import styles from './items.module.css';

type Props = {
  arrItems?: ItemData[];
  isLoading: boolean;
};

const Items: FC<Props> = (props) => {
  const { arrItems, isLoading } = props;
  console.log(arrItems);

  const items = arrItems?.map((item, index) => (
    <Item
      key={item.mal_id}
      item={item}
      rank={index + 1}
      className={styles.anItem}
    />
  ));

  const loadingItems = Array.from({ length: 5 }, (_, index) => (
    <LoadingImg
      key={index}
      className={`${styles['loader-container']} ${styles.anItem}`}
    />
  ));

  return (
    <div className={styles['items-container']}>
      {isLoading || !arrItems ? loadingItems : items}
    </div>
  );
};

export default Items;
