import { FC, useEffect, useState, useRef } from 'react';
import useSWR from 'swr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { InfinitySpin } from 'react-loader-spinner';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number[] | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const forwardPage = () => {
    if (totalPage?.length && currentPage !== totalPage.length) {
      setCurrentPage((pre) => ++pre);
    }
  };

  const backwardPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((pre) => --pre);
    }
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const { data, error, isLoading, mutate } = useSWR(
    props?.mal_id
      ? `https://api.jikan.moe/v4/anime/${props?.mal_id}/episodes?page=${currentPage}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error && error.status === 429) {
      const timeout = setTimeout(() => mutate(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [error, mutate]);

  useEffect(() => {
    if (data?.pagination) {
      const newTotalPage = generateRange(1, data?.pagination.last_visible_page);
      setTotalPage(newTotalPage);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props?.mal_id]);

  console.dir(data);

  return (
    <>
      {!isLoading || error?.status !== 429 ? (
        <div className={styles['episodes-container']}>
          {data?.data?.map((episode: Episode) => (
            <div className={styles['episode-container']} key={episode?.mal_id}>
              <p>Episode : {episode?.mal_id}</p>
              <p
                className={`${episode?.filler ? styles.filler : styles.cannon}`}
              >
                {episode?.filler ? 'filler' : 'cannon'}
              </p>
              <p className={styles.title}>
                {episode?.title.slice(0, 50)}
                <span> ({episode?.score})</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.loading}>
          <InfinitySpin width='200' color='#3c89e1' />
        </div>
      )}
      <div className={styles.buttons} ref={paginationRef}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={backwardPage}
          className={styles.icon}
        />
        <div className={styles.btnNum}>
          {totalPage?.map((pageNum) => (
            <p
              key={pageNum}
              className={`${styles.pageNum} ${
                currentPage === pageNum && styles.activePageNum
              } ${Math.abs(pageNum - currentPage) < 3 && styles.sides}
              ${pageNum === totalPage?.length ?? false ? styles.endNum : null}
              `}
              onClick={() => changePageHandler(pageNum)}
            >
              {pageNum}
            </p>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={forwardPage}
          className={styles.icon}
        />
      </div>
    </>
  );
};

export default EpisodePanel;
