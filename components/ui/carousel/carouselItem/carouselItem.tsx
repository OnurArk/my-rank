import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './carouselItem.module.css';

type Props = {
  img: string;
  mal_id: number;
  title: string;
};

const CarouselItem: FC<Props> = (props) => {
  return (
    <Link
      href={{
        pathname: '/anime/[animeId]',
        query: { animeId: props.mal_id },
      }}
      className={styles['item-container']}
    >
      <div className={styles['img-container']}>
        <Image
          loader={() => props?.img}
          src={`${props.title}?mal_id=${props.mal_id}.png`}
          alt={props.title}
          fill
          sizes='(max-width: 550px) 130px , (min-width: 551px) 150px , (min-width: 870px) 155px,(min-width: 1097px) 185px'
          priority
        />
        <p className={styles.title}>{props.title}</p>
      </div>
    </Link>
  );
};

export default CarouselItem;
