import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

import { ItemData } from '@/models/Item';

import SectionList from '@/components/ui/section-list/section-list';

import {
  getSeasonNow,
  getSeasonUpcoming,
  getTopAnimes,
} from '@/helpers/request-handler';

import styles from '@/styles/Home.module.css';

let firstTime = true;

function Home() {
  const [trends, setTrends] = useState<ItemData[]>([]);
  const [upcoming, setUpcoming] = useState<ItemData[]>([]);
  const [topAnime, setTopAnime] = useState<ItemData[]>([]);

  const getTrends = useCallback(async () => {
    const trends = await getSeasonNow();
    if (trends) {
      setTrends(trends.data);
    }
  }, []);

  const getUpcoming = useCallback(async () => {
    const upcoming = await getSeasonUpcoming();
    if (upcoming) {
      setUpcoming(upcoming.data);
    }
  }, []);

  const getTopAnime = useCallback(async () => {
    const topAnime = await getTopAnimes();
    if (topAnime) {
      setTopAnime(topAnime.data);
    }
  }, []);

  useEffect(() => {
    if (firstTime) {
      getTrends();
      getUpcoming();
      getTopAnime();
      firstTime = false;
    }
  }, [getTrends, getUpcoming, getTopAnime]);

  return (
    <div className={styles['home-container']}>
      <Head>
        <title>My Rank - Home</title>
        <meta name='description' content='' />
      </Head>
      <div className={styles['sections-container']}>
        <SectionList sectionName='Trending Now' data={trends} />
        <SectionList sectionName='Up Coming Animes' data={upcoming} />
        <SectionList sectionName='Top Animes' data={topAnime} />
      </div>
    </div>
  );
}

export default Home;

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
