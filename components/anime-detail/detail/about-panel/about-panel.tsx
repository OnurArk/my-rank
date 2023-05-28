import { FC } from 'react';
import Link from 'next/link';

import { ItemData } from '@/models/Item-Type';

import styles from './about-panel.module.css';
type Props = {
  data: ItemData;
};

let formattedDateFrom: string;
let formattedDateTo: string;

const AboutPanel: FC<Props> = (props) => {
  if (props.data?.aired?.from) {
    const dateObj = new Date(props.data.aired?.from);
    formattedDateFrom = dateObj.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
    });
  }

  if (props.data?.aired?.to) {
    const dateObj = new Date(props.data.aired?.to);

    formattedDateTo = dateObj.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
    });
  }

  return (
    <div className={styles['panel-about-container']}>
      {props.data?.streaming?.length !== 0 && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Where to Watch :</p>
          <div className={styles.links}>
            {props.data.streaming?.map((stream, index) => (
              <Link
                href={stream.url}
                key={index}
                target='_blank'
                className={`${styles.link} ${styles.sideText}`}
              >
                {stream.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {props.data?.type && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Type :</p>
          <p className={styles.sideText}>{props.data.type}</p>
        </div>
      )}

      {props.data?.duration && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Duration :</p>
          <p className={styles.sideText}>{props.data.duration}</p>
        </div>
      )}

      {props.data?.score && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.score}</p>
        </div>
      )}

      {props.data?.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Rank :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}
      {props.data?.genres.length !== 0 && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Genres :</p>
          <div className={styles.links}>
            {props.data.genres.map((genre) => (
              <p
                key={genre.mal_id}
                className={`${styles.link} ${styles.sideText}`}
              >
                {genre.name}
              </p>
            ))}
          </div>
        </div>
      )}

      {props.data?.aired && (formattedDateFrom || props.data.aired?.to) && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Airing Date :</p>
          <p className={styles.sideText}>{formattedDateFrom}</p>
        </div>
      )}

      {props.data?.aired && (formattedDateFrom || props.data.aired?.to) && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>
            {props.data.airing ? 'End Date' : 'Up to'} :
          </p>
          <p className={styles.sideText}>
            {formattedDateTo && props.data.airing
              ? formattedDateTo
              : 'On going'}
          </p>
        </div>
      )}

      {props.data?.synopsis && (
        <div className={styles['Synopsis-container']}>
          <p className={styles.synopsis}>Synopsis</p>
          <p className={styles.sideText}>{props.data.synopsis}</p>
        </div>
      )}
    </div>
  );
};

export default AboutPanel;
