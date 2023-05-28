import { FC } from 'react';
import Link from 'next/link';

import { ItemData } from '@/models/Item-Type';

import styles from './about-panel.module.css';
type Props = {
  data: ItemData;
};

const AboutPanel: FC<Props> = (props) => {
  return (
    <div className={styles['panel-about-container']}>
      {props.data.streaming?.length !== 0 && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Where to Watch :</p>
          <div className={styles.links}>
            {props.data.streaming?.map((stream, index) => (
              <Link
                href={stream.url}
                key={index}
                target='_blank'
                className={`${styles.streamLink} ${styles.sideText}`}
              >
                {stream.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {props.data.type && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Type :</p>
          <p className={styles.sideText}>{props.data.type}</p>
        </div>
      )}

      {props.data.duration && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Duration :</p>
          <p className={styles.sideText}>{props.data.duration}</p>
        </div>
      )}

      {props.data.score && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.score}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Score :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}

      {props.data.rank && (
        <div className={styles['simple-side-container']}>
          <p className={styles.sideTitle}>Saacore :</p>
          <p className={styles.sideText}>{props.data.rank}</p>
        </div>
      )}
    </div>
  );
};

export default AboutPanel;
