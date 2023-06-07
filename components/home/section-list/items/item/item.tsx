import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ItemData, Title } from '@/models/Item-Type';

import styles from './item.module.css';

type Props = {
  item: ItemData;
  rank: number;
  className?: string;
};

const Item: FC<Props> = (props) => {
  const titleHandler = (tittleArr: Title[]) => {
    const englishItem = tittleArr?.find(
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
  const title = titleHandler(props.item.titles);
  // To do : charackter ve ya anime olarak hreifi değiştir
  return (
    <Link
      href={{
        pathname: '/anime/[animeId]',
        query: { animeId: props?.item?.mal_id },
      }}
      className={`${styles['item-container']} ${props.className}`}
    >
      <div className={styles['img-container']}>
        {props.item.score && <p className={styles.score}>{props.item.score}</p>}
        {props.item.type && <p className={styles.type}>{props.item.type}</p>}
        {!props.item.score && !props.item.title && props.rank && (
          <p className={styles.rank}>{props.rank}</p>
        )}
        <Image
          loader={() => props.item.images.jpg.image_url}
          src={`${props.item.title}?mal_id=${props.item?.mal_id}.png`}
          alt={props.item.title ? props.item.title : props.item.name}
          fill
          sizes='(max-width: 550px) 130px , (min-width: 551px) 150px , (min-width: 870px) 155px,(min-width: 1097px) 185px'
          priority
        />
      </div>

      {props.item.title && <p className={styles.title}>{title}</p>}
      {!props.item.title && props.item.name && (
        <p className={styles.title}>{props.item.name}</p>
      )}
    </Link>
  );
};

export default Item;
