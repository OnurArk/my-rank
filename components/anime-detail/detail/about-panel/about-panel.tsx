import { FC, useState } from 'react';
import Link from 'next/link';

import { LoadingText } from '@/components/ui/loading-skeleton/loading-img';

import { ItemData } from '@/models/Item-Type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import styles from './about-panel.module.css';

type Props = {
  data: ItemData;
  isLoading: boolean;
};

const AboutPanel: FC<Props> = (props) => {
  const [isSynopsisFull, setIsSynopsisFull] = useState<boolean>(false);
  const { data, isLoading } = props;

  const toggleSynopsisHandler = () => {
    setIsSynopsisFull((pre) => !pre);
  };

  let formattedDateFrom: string = '';
  let formattedDateTo: string | null = null;
  if (data?.aired?.from) {
    const dateObj = new Date(data.aired?.from);
    formattedDateFrom = dateObj.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
    });
  }

  if (data?.aired?.to) {
    const dateObj = new Date(data.aired?.to);

    formattedDateTo = dateObj.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
    });
  }

  return (
    <>
      {isLoading && (
        <div
          className={`${styles['panel-about-container']} ${styles['loading-container']}`}
        >
          <LoadingText
            lineNumber={5}
            containerClassName={styles.loadingInfo}
            className={styles.loadingText}
          />
          <LoadingText lineNumber={5} className={styles.loadingText} />
        </div>
      )}

      {!isLoading && (
        <div className={styles['panel-about-container']}>
          {Array.isArray(data?.streaming) && data?.streaming?.length !== 0 && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Where to Watch :</p>
              <div className={styles.links}>
                {data.streaming?.map((stream, index) => (
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

          {data?.type && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Type :</p>
              <p className={styles.sideText}>{data.type}</p>
            </div>
          )}

          {data?.duration && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Duration :</p>
              <p className={styles.sideText}>{data.duration}</p>
            </div>
          )}

          {data?.score && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Score :</p>
              <p className={styles.sideText}>{data.score}</p>
            </div>
          )}

          {data?.rank && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Rank :</p>
              <p className={styles.sideText}>{data.rank}</p>
            </div>
          )}

          {data?.source && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Source :</p>
              <p className={styles.sideText}>{data.source}</p>
            </div>
          )}

          {data?.episodes && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Episodes :</p>
              <p className={styles.sideText}>{data.episodes}</p>
            </div>
          )}

          {Array.isArray(data?.genres) && data?.genres.length !== 0 && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Genres :</p>
              <div className={styles.links}>
                {data.genres.map((genre) => (
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

          {data?.aired && (formattedDateFrom || data.aired?.to) && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>Airing Date :</p>
              <p className={styles.sideText}>{formattedDateFrom}</p>
            </div>
          )}

          {data?.aired && (formattedDateFrom || data.aired?.to) && (
            <div className={styles['simple-side-container']}>
              <p className={styles.sideTitle}>
                {formattedDateTo ? 'End Date' : 'Up to'} :
              </p>
              <p className={styles.sideText}>
                {formattedDateTo ? formattedDateTo : 'On going'}
              </p>
            </div>
          )}

          {data?.synopsis && (
            <div className={styles['Synopsis-container']}>
              <p className={styles.synopsis}>Synopsis</p>
              <p
                className={`${styles.sideText} ${
                  !isSynopsisFull && styles.synopsisText
                }`}
              >
                {data.synopsis}
              </p>
              <p
                className={styles.synopsisTogle}
                onClick={toggleSynopsisHandler}
              >
                {isSynopsisFull ? (
                  <>
                    See Less <FontAwesomeIcon icon={faAngleDoubleUp} />
                  </>
                ) : (
                  <>
                    Read All <FontAwesomeIcon icon={faAngleDoubleDown} />
                  </>
                )}{' '}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AboutPanel;
