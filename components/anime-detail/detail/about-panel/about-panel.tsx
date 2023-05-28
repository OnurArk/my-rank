import { FC } from 'react';
import Link from 'next/link';

import { ItemData } from '@/models/Item-Type';

import styles from './about-panel.module.css';
type Props = {
  data: ItemData;
};

const AboutPanel: FC<Props> = (props) => {
  return (
    <div className={styles['panel-about-container']}>
      {props.data.streaming?.length !== 0 && (
        <div className={styles['where-towatch-container']}>
          <p className={styles.sideTitle}>Where to Watch : </p>
          <div className={styles.links}>
            {props.data.streaming?.map((stream, index) => (
              <Link
                href={stream.url}
                key={index}
                target='_blank'
                className={styles.streamLink}
              >
                {stream.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPanel;
