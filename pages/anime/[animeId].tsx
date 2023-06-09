import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import DetailAnime from '@/components/anime-detail/detail/detail-anime';
import BackgroundImg from '@/components/anime-detail/bacground-img/background-img';

import { ItemData } from '@/models/Item-Type';
import styles from '../../styles/anime/animeId.module.css';

type Props = {};

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject({ status: res.status, message: res.statusText })
  );

const DetailPage: FC<Props> = (props) => {
  const router = useRouter();

  const {
    data: animeData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    router.query.animeId
      ? `https://api.jikan.moe/v4/anime/${router.query.animeId}/full`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 1200);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  return (
    <div className={styles['detail-page-container']}>
      <BackgroundImg />
      <div className={styles.space}></div>
      <div className={styles['detail-container']}>
        <DetailAnime
          data={animeData?.data}
          isLoading={isLoading || (error && error.status === 429)}
        />
      </div>
    </div>
  );
};

export default DetailPage;
