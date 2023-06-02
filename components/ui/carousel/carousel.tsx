import { FC, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import styles from './carousel.module.css';

type Props = {
  mal_id: number;
  type: string;
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

  return <div></div>;
};

export default Carousel;
