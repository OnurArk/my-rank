import { FC } from 'react';
import Image from 'next/image';

import styles from './item.module.css';

type Props = {
  item: {
    images: {
      jpg: {
        image_url: string;
      };
    };
    title: string;

    type: string;
    score: number;
  };
};

const Item: FC<Props> = (props) => {
  console.log();

  return (
    <div className={styles['item-container']}>
      <div className={styles['img-container']}>
        {props.item.score && <p className={styles.score}>{props.item.score}</p>}
        <Image
          loader={() => props.item.images.jpg.image_url}
          src={`${props.item.title}.png`}
          width={185}
          height={265}
          alt={props.item.title}
        />
      </div>

      <p className={styles.title}>
        {props.item.title.slice(0, 50)} - {props.item.type}
      </p>
    </div>
  );
};

export default Item;
