import { FC, useEffect } from 'react';
import useSWR from 'swr';

import styles from './episode-panel.module.css';

type Episode = {
  mal_id: number;
  filler: boolean;
  score: number;
  title: string;
};

type Props = {
  mal_id: number;
};

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject({ status: res.status, message: res.statusText })
  );

const EpisodePanel: FC<Props> = (props) => {
  const { data, error, isLoading, mutate } = useSWR(
    props?.mal_id
      ? `https://api.jikan.moe/v4/anime/${props?.mal_id}/episodes`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  console.log(data);

  return (
    <div className={styles['episodes-container']}>
      {data?.data.map((episode: Episode) => (
        <div className={styles['episode-container']} key={episode?.mal_id}>
          <p>Episode : {episode?.mal_id}</p>
          <p className={`${episode?.filler ? styles.filler : styles.cannon}`}>
            {episode?.filler ? 'filler' : 'cannon'}
          </p>
          <p>
            {episode?.title.slice(0, 50)}
            <span> ({episode?.score})</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default EpisodePanel;
