import Head from 'next/head';

import { ItemData } from '@/models/Item-Data';

import SectionList from '@/components/ui/section-list/section-list';

import styles from '@/styles/Home.module.css';

function Home() {
  return (
    <div className={styles['home-container']}>
      <Head>
        <title>My Rank - Home</title>
        <meta name='description' content='' />
      </Head>
      <div className={styles['sections-container']}>
        <SectionList sectionName='Trending Now' endpoint={'seasons/now'} />
        <SectionList
          sectionName='Up Coming Animes'
          endpoint={'seasons/upcoming'}
        />
        <SectionList sectionName='Top Animes' endpoint={'top/anime'} />
        <SectionList sectionName='Top Characters' endpoint={'top/characters'} />
      </div>
    </div>
  );
}

export default Home;

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
