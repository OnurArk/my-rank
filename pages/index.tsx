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
        />
        <SectionList
          sectionName='UPCOMING NEXT SEASON'
          endpoint={'seasons/upcoming?filter=tv&limit=5'}
        />
        <SectionList
          sectionName='POPULAR ANİMES'
          endpoint={'top/anime?filter=bypopularity&type=tv&limit=5'}
        />
      </div>
    </div>
  );
}

export default Home;

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
