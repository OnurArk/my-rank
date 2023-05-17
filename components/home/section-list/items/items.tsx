import { FC } from 'react';

import Item from './item/item';
import { ItemData } from '@/models/Item-Type';

import styles from './items.module.css';

type Props = {
  arrItems: ItemData[];
};

const Items: FC<Props> = (props) => {
  const { arrItems } = props;

  const items = arrItems.map((item, index) => (
    <Item key={item.mal_id} item={item} rank={index + 1} />
  ));

  return <div className={styles['items-container']}>{items}</div>;
};

export default Items;
