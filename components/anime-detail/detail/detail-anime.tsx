import { FC, useState } from 'react';
import Image from 'next/image';

import { ItemData, Title } from '@/models/Item-Type';

import styles from './detail-anime.module.css';

type Props = {
  data: ItemData;
};

const DetailAnime: FC<Props> = (props) => {
  const [isPanelAbout, setPanelItAbout] = useState<boolean>(true);

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
    const englishItem = tittleArr.find(
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
  const title = titleHandler(props.data.titles);

  return (
    <div className={styles['detail-anime-container']}>
      <div className={styles.layout1}>
        <div className={styles['img-container']}>
          <Image
            loader={() => props.data?.images.jpg.large_image_url}
            src={`${props.data?.title}?mal_id=${props.data?.mal_id}.png`}
            alt={props.data?.title || props.data?.name}
            fill
            sizes='(max-width: 591px) 200px , (min-width: 592px) 185px ,(min-width: 1088px) 230px'
          />
        </div>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.layout2}>
        <div className={styles['buttons-container']}>
          <button onClick={openAboutPanelHandler}>About</button>
          <button onClick={openEpisodePanelHandler}>Episodes</button>
        </div>
        <div className={styles['dynamic-panel']}>
          {isPanelAbout && <h3 className={styles['panel-title']}>ABOUT</h3>}
          {!isPanelAbout && <h3 className={styles['panel-title']}>EPİSODES</h3>}
        </div>
      </div>
    </div>
  );
};

export default DetailAnime;
