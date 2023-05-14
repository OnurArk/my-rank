import { FC } from 'react';
import Image from 'next/image';

import { ItemData } from '@/models/Item-Data';

import styles from './item.module.css';

type Props = {
  item: ItemData;
  rank: number;
};

const Item: FC<Props> = (props) => {
  return (
    <div className={styles['item-container']}>
      <div className={styles['img-container']}>
        {props.item.score && <p className={styles.score}>{props.item.score}</p>}
        {!props.item.score && !props.item.title && props.rank && (
          <p className={styles.rank}>{props.rank}</p>
        )}
        <Image
          loader={() => props.item.images.jpg.image_url}
          src={`${props.item.title}.png`}
          width={185}
          height={265}
          alt={props.item.title ? props.item.title : props.item.name}
        />
      </div>

      {props.item.title && (
        <p className={styles.title}>
          {props.item.title.slice(0, 50)} - {props.item.type}
        </p>
      )}
      {props.item.name && <p className={styles.title}>{props.item.name}</p>}
    </div>
  );
};

export default Item;
