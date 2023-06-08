import { FC, useEffect } from 'react';
import useSWR from 'swr';

import styles from './anime-characters.module.css';

type Props = {
  mal_id: number;
};

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject({ status: res.status, message: res.statusText })
  );

const AnimeCharacters: FC<Props> = (props) => {
  const {
    data: animeCharactersData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    props?.mal_id
      ? `https://api.jikan.moe/v4/anime/${props?.mal_id}/characters`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 200);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  console.log(animeCharactersData);

  return <div></div>;
};

export default AnimeCharacters;
