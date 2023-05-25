import { FC } from 'react';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import styles from '../../styles/anime/animeId.module.css';
import BackgroundImg from '@/components/anime-detail/bacground-img/background-img';

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DetailPage: FC<Props> = (props) => {
  const router = useRouter();

  const {
    data: animeData,
    error,
    isLoading,
  } = useSWR(
    `https://api.jikan.moe/v4/anime/${router.query.animeId}/full`,
    fetcher
  );

  console.log(animeData);

  return (
    <div className={styles['detail-page-container']}>
      <BackgroundImg />
      <div className={styles['detail-container']}>aaa</div>
    </div>
  );
};

export default DetailPage;
