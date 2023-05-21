import { FC } from 'react';
import Image from 'next/image';

import { ItemData } from '@/models/Item-Type';

import styles from './item.module.css';

type Props = {
  item: ItemData;
  rank: number;
  className?: string;
};

const Item: FC<Props> = (props) => {
  return (
    <div className={`${styles['item-container']} ${props.className}`}>
      <div className={styles['img-container']}>
        {props.item.score && <p className={styles.score}>{props.item.score}</p>}
        {props.item.type && <p className={styles.type}>{props.item.type}</p>}
        {!props.item.score && !props.item.title && props.rank && (
          <p className={styles.rank}>{props.rank}</p>
        )}
        <Image
          loader={() => props.item.images.jpg.image_url}
          src={`${props.item.title}.png`}
          fill
          sizes='(max-width: 550px) 130px , (min-width: 551px) 150 , (min-width: 870px) 155,(min-width: 1097px) 185'
          alt={props.item.title ? props.item.title : props.item.name}
        />
      </div>

      {props.item.title && (
        <p className={styles.title}>{props.item.title.slice(0, 50)}</p>
      )}
      {props.item.name && <p className={styles.title}>{props.item.name}</p>}
    </div>
  );
};

export default Item;
