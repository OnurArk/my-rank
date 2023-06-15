import { FC, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import styles from './anime-characters.module.css';

type VoiceActors = {
  person: { mal_id: number; name: string };
};

type Characters = {
  character: {
    mal_id: number;
    name: string;
    images: { jpg: { image_url: string }; webp: { image_url: string } };
  };
  favorites: number;
  role: string;
  voice_actors: VoiceActors[];
};

type AnimeCharactersData = {
  data: Characters[];
  error?: number;
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

const AnimeCharacters: FC<Props> = (props) => {
  const {
    data: animeCharactersData,
    error,
    isLoading,
    mutate,
  } = useSWR<AnimeCharactersData>(
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

  return (
    <>
      {animeCharactersData &&
        !animeCharactersData?.error &&
        !error &&
        !isLoading && (
          <div className={styles['characters-container']}>
            {animeCharactersData?.data?.map((infoCharacter) => (
              <div key={infoCharacter.character?.mal_id}>
                <div className={styles['img-container']}>
                  <Image
                    loader={() =>
                      infoCharacter?.character?.images.jpg.image_url
                    }
                    src={`${infoCharacter.character.name}?mal_id=${infoCharacter.character.mal_id}.png`}
                    alt={infoCharacter.character.name}
                    fill
                    sizes='(max-width: 591px) 200px , (min-width: 592px) 185px ,(min-width: 1088px) 230px'
                  />
                </div>
                <p className={styles.name}>
                  {infoCharacter.character.name.replace(',', '')}
                </p>
                <p className={styles.voice}>
                  {infoCharacter.voice_actors?.[0]?.person.name.replace(
                    ',',
                    ''
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
    </>
  );
};

export default AnimeCharacters;
