import { FC, CSSProperties } from 'react';
import Image from 'next/image';
import { ItemData } from '@/models/Item-Type';

import styles from './card.module.css';

type Props = {
  data: ItemData;
  width?: number;
  isLoading: boolean;
};

const Card: FC<Props> = (props) => {
  const rootStyle: CSSProperties = {
    '--width': props.width ? `${props.width}px` : '185px',
  } as CSSProperties;

  return (
    <div className={styles['card-container']} style={rootStyle}>
      <div className={styles['img-container']}>
        {props.data.score && <p className={styles.score}>{props.data.score}</p>}
        {props.data.type && <p className={styles.type}>{props.data.type}</p>}
        <Image
          loader={() => props.data?.images.jpg.image_url}
          src={`${props.data.title}.png`}
          alt={props.data?.title || props.data.name}
          fill
          sizes='(max-width: 550px) 130px , (min-width: 551px) 150 , (min-width: 870px) 155,(min-width: 1097px) 185'
          priority
        />
      </div>
      <p className={styles.title}>
        {props.data.title
          ? `${props.data.title.slice(0, 50)}`
          : props.data.name}
      </p>
    </div>
  );
};

export default Card;
