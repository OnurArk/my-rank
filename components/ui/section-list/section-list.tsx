import { FC } from 'react';

import Items from './items/items';
import { ItemData } from '@/models/Item';

import styles from './section-list.module.css';

type Props = {
  data: ItemData[];
  sectionName: string;
};

const SectionList: FC<Props> = (props) => {
  return (
    <div className={styles['section-list-container']}>
      <p className={styles.title}>{props.sectionName}</p>
      <Items arrItems={props.data} />
    </div>
  );
};

export default SectionList;
