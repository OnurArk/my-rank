import { FC, useEffect } from 'react';
import useSWR from 'swr';

import CarouselItem from './carouselItem/carouselItem';

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
  const {
    data: recomentData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `https://api.jikan.moe/v4/${props.type}/${props.mal_id}/recommendations`,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  console.log(recomentData);

  return (
    <div className={styles['section-container']}>
      <h3>People Also Watched</h3>
      <div className={styles['carousel-container']}>
        {recomentData &&
          recomentData?.data
            ?.slice(0, 8)
            .map((item: Recommendations) => (
              <CarouselItem
                key={item.entry.mal_id}
                mal_id={item.entry.mal_id}
                img={item.entry.images.jpg.image_url}
                title={item.entry.title}
              />
            ))}
      </div>
    </div>
  );
};

export default Carousel;
