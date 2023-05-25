import { FC } from 'react';
import { useRouter } from 'next/router';

import useSWR from 'swr';

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

  return <div>a</div>;
};

export default DetailPage;
