import Head from 'next/head';

import SectionList from '@/components/home/section-list/section-list';

import styles from '@/styles/Home.module.css';

function Home() {
  return (
    <div className={styles['home-container']}>
      <Head>
        <title>My Rank - Home</title>
        <meta
          name='description'
          content='Trending Anime, Upcoming Anime, Populer Anime'
        />
      </Head>
      <div className={styles['sections-container']}>
        <SectionList
          sectionName='TRENDING NOW'
          endpoint={'seasons/now?limit=5'}
          toLink='trending'
        />
        <SectionList
          sectionName='UPCOMING NEXT SEASON'
          endpoint={'seasons/upcoming?filter=tv&limit=5'}
          toLink='upcoming'
        />
        <SectionList
          sectionName='POPULAR ANIMES'
          endpoint={'top/anime?filter=bypopularity&type=tv&limit=5'}
          toLink='popular-anime'
        />
        <SectionList
          sectionName='TOP CHARACTERS'
          endpoint={'top/characters?filter=bypopularity&type=tv&limit=5'}
          toLink='top-characters'
        />
      </div>
    </div>
  );
}

export default Home;

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
