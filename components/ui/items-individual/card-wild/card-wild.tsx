import { FC } from 'react';
import Image from 'next/image';
import { ItemData } from '@/models/Item-Type';

import styles from './card-wild.module.css';

type Props = {
  data: ItemData;
};

let formattedDateFrom: string;
let formattedDateTo: string;

const CardWild: FC<Props> = (props) => {
  if (props.data.aired) {
    formattedDateFrom = new Date(props.data.aired.from).toLocaleDateString(
      'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

    formattedDateTo = new Date(props.data.aired.to).toLocaleDateString(
      'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  }

  return (
    <div className={styles['card-container']}>
      <div className={styles['img-container']}>
        <Image
          loader={() => props.data?.images.jpg.image_url}
          src={`${props.data.title}.png`}
          alt={props.data?.title || props.data.name}
          width={225}
          height={321}
        />
      </div>
      <div className={styles.sideInfo}>
        <p className={styles.title}>
          {props.data.title
            ? `${props.data.title.slice(0, 50)}${
                props.data.title && props.data.title.length > 50 ? '-' : ''
              }`
            : props.data.name}
        </p>
        {props.data.score && (
          <p className={styles.score}>Score: {props.data.score}</p>
        )}
        {props.data.type && (
          <p className={styles.type}>Type: {props.data.type}</p>
        )}

        {props.data.episodes && (
          <p className={styles.type}>Episodes: {props.data.episodes}</p>
        )}

        {props.data.aired?.from && (
          <p className={styles.type}>Launch Date: {formattedDateFrom}</p>
        )}

        {props.data.aired?.to && (
          <p className={styles.type}>Ending Date: {formattedDateTo}</p>
        )}
      </div>
    </div>
  );
};

export default CardWild;
