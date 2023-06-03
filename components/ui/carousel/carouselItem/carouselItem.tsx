import { FC } from 'react';
import Image from 'next/image';

import styles from './carouselItem.module.css';

type Props = {
  img: string;
  mal_id: number;
  title: string;
};

const CarouselItem: FC<Props> = (props) => {
  return (
    <div>
      <div className={styles['img-container']}>
        <Image
          loader={() => props?.img}
          src={`${props.title}?mal_id=${props.mal_id}.png`}
          alt={props.title}
          fill
          sizes='(max-width: 550px) 130px , (min-width: 551px) 150px , (min-width: 870px) 155px,(min-width: 1097px) 185px'
          priority
        />
      </div>
    </div>
  );
};

export default CarouselItem;
