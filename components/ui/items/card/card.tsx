import { FC, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ItemData, Title } from '@/models/Item-Type';
import styles from './card.module.css';

type Props = {
  data: ItemData;
  width?: number;
};

const Card: FC<Props> = (props) => {
  const titleHandler = (tittleArr: Title[]) => {
    const englishItem = tittleArr.find(
      (item) => item.type === 'English' && item.title
    );

    if (!tittleArr) {
      return;
    }

    if (englishItem) {
      return englishItem.title.replace(/[\[\]]/g, '').trim();
    } else {
      return tittleArr?.[0].title.replace(/[\[\]]/g, '').trim();
    }
  };
  const title = titleHandler(props.data.titles);

  const rootStyle: CSSProperties = {
    '--width': props.width ? `${props.width}px` : '185px',
  } as CSSProperties;

  return (
    <Link
      href={{
        pathname: '/anime/[animeId]',
        query: { animeId: props.data.mal_id },
      }}
      className={styles['card-container']}
      style={rootStyle}
    >
      <div className={styles['img-container']}>
        {props.data?.images.jpg.image_url && (
          <>
            {props.data.score && (
              <p className={styles.score}>{props.data.score}</p>
            )}
            {props.data.type && (
              <p className={styles.type}>{props.data.type}</p>
            )}
            <Image
              loader={() => props.data?.images.jpg.image_url}
              src={`${props.data.title}?mal_id=${props.data?.mal_id}.png`}
              alt={props.data?.title || props.data.name}
              fill
              sizes='(max-width: 550px) 130px , (min-width: 551px) 150px , (min-width: 870px) 155px,(min-width: 1097px) 185px'
              priority
            />
          </>
        )}
      </div>
      <p className={styles.title}>{title ? title : props.data.name}</p>
    </Link>
  );
};

export default Card;
