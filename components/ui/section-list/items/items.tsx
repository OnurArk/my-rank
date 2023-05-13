import { FC } from 'react';

import Item from './item/item';
import { ItemData } from '@/models/Item';

import styles from './items.module.css';

type Props = {
  arrItems: ItemData[];
};

const Items: FC<Props> = (props) => {
  const { arrItems } = props;

  const items = arrItems.map((item) => <Item key={item.mal_id} item={item} />);

  return <div className={styles['items-container']}>{items}</div>;
};

export default Items;
