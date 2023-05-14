import { FC } from 'react';
import Image from 'next/image';
import { ItemData } from '@/models/Item-Data';

import styles from './card.module.css';

type Props = {
  data: ItemData;
};

const Card: FC<Props> = (props) => {
  return (
    <div className={styles['card-container']}>
      <div className={styles['img-container']}>
        {props.data.score && <p className={styles.score}>{props.data.score}</p>}
        {props.data.type && <p className={styles.type}>{props.data.type}</p>}
        <Image
          loader={() => props.data?.images.jpg.image_url}
          src={`${props.data.title}.png`}
          alt={props.data?.title || props.data.name}
          width={225}
          height={321}
        />
      </div>
      <p className={styles.title}>
        {props.data.title
          ? `${props.data.title.slice(0, 50)}${
              props.data.title && props.data.title.length > 50 ? '-' : ''
            }`
          : props.data.name}
      </p>
    </div>
  );
};

export default Card;
