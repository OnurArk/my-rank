import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';

import CarouselItem from './carouselItem/carouselItem';
import DisplayedItemHandler from './carouselItem/displayedItemHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './carousel.module.css';

type Props = {
  mal_id: number;
  type: string;
};

type Recommendations = {
  entry: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
        large_image_url: string;
        small_image_url: string;
      };
    };
  };
};

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject({ status: res.status, message: res.statusText })
  );

const Carousel: FC<Props> = (props) => {
  const [arrLength, setArrLength] = useState<number>();

  const {
    data: recomentData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `https://api.jikan.moe/v4/${props.type}/${props.mal_id}/recommendations`,
    fetcher
  );

  const {
    startSlice,
    endSlice,
    displayedImg,
    forwardHandler,
    backwardHandler,
  } = DisplayedItemHandler({ arrLength });

  useEffect(() => {
    if (recomentData) {
      setArrLength(recomentData?.data?.length);
    }
  }, [recomentData]);

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 1000);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  return (
    <div className={styles['section-container']}>
      {!!arrLength && arrLength > 0 && !isLoading && (
        <>
          <h3 className={styles.title}>People Also Watched</h3>
          <div className={styles['carousel-container']}>
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.leftAngel}`}
              icon={faAngleLeft}
              onClick={backwardHandler}
            />
            {recomentData &&
              recomentData?.data
                ?.slice(startSlice, endSlice)
                .map((item: Recommendations) => (
                  <CarouselItem
                    key={item.entry.mal_id}
                    mal_id={item.entry.mal_id}
                    img={item.entry.images.jpg.image_url}
                    title={item.entry.title}
                  />
                ))}
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.rightAngel}`}
              icon={faAngleRight}
              onClick={forwardHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
