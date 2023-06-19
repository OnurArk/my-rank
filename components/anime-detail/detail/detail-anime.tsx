import { CSSProperties, FC, useState } from 'react';
import Image from 'next/image';

import Button from '@/components/ui/button/button';
import AboutPanel from './about-panel/about-panel';
import EpisodePanel from './episode-panel/episode-panel';
import Carousel from '@/components/ui/carousel/carousel';
import AnimeCharacters from './anime-characters/anime-characters';
import {
  LoadingImg,
  LoadingText,
} from '@/components/ui/loading-skeleton/loading-img';

import { ItemData, Title } from '@/models/Item-Type';
import styles from './detail-anime.module.css';

type Props = {
  data: ItemData;
  isLoading: boolean;
};

const DetailAnime: FC<Props> = (props) => {
  const { isLoading, data } = props;
  const [isPanelAbout, setPanelItAbout] = useState<boolean>(true);
  console.log(isLoading);

  const openAboutPanelHandler = () => {
    if (isPanelAbout === false) {
      setPanelItAbout(true);
    }
  };

  const openEpisodePanelHandler = () => {
    if (isPanelAbout === true) {
      setPanelItAbout(false);
    }
  };

  const titleHandler = (tittleArr: Title[]) => {
    const englishItem = tittleArr?.find(
      (item) => item.type === 'English' && item.title
    );

    if (!tittleArr) {
      return;
    }

    if (englishItem) {
      return englishItem.title.replace(/[\[\]]/g, '').trim();
    } else {
      return tittleArr?.[0].title.replace(/[\[\]]/g, '').trim();
    }
  };
  const title = titleHandler(data?.titles);

  const styleImg = {
    backgroundImage: `url(${data?.images?.jpg?.small_image_url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  } as CSSProperties;

  return (
    <div className={styles['detail-anime-container']}>
      <div className={styles.layout1}>
        {!isLoading && (
          <div className={styles['img-container']}>
            <Image
              loader={() => data?.images?.jpg.large_image_url}
              src={`${data?.title}?mal_id=${data?.mal_id}.png`}
              alt={data?.title || data?.name || 'anime-image'}
              fill
              sizes='(max-width: 591px) 200px , (min-width: 592px) 185px ,(min-width: 1088px) 230px'
              style={styleImg}
            />
          </div>
        )}
        {isLoading && <LoadingImg className={styles['img-container']} />}
        {!isLoading ? (
          <h2 className={styles.title}>{title}</h2>
        ) : (
          <LoadingText className={`${styles.title} ${styles.loadingTitle}`} />
        )}
      </div>
      <div className={styles.layout2}>
        <div className={styles['buttons-container']}>
          <Button onClick={openAboutPanelHandler}>About</Button>
          <Button onClick={openEpisodePanelHandler}>Episodes</Button>
        </div>

        <div className={styles['dynamic-panel']}>
          {isPanelAbout && <AboutPanel data={data} isLoading={isLoading} />}
          {!isPanelAbout && data && data?.mal_id && (
            <EpisodePanel mal_id={data.mal_id} />
          )}
        </div>
      </div>

      <div className={styles.layout3}>
        {data && data?.mal_id && <AnimeCharacters mal_id={data?.mal_id} />}
      </div>

      <div className={styles.layout4}>
        <div className={styles.section}>
          {data && data?.mal_id && (
            <Carousel mal_id={data?.mal_id} type={'anime'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAnime;
