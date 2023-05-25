import { FC } from 'react';
import Image from 'next/image';

import useSWR from 'swr';

import styles from './background-img.module.css';

const BackgroundImg: FC = () => {
  return <div className={styles['img-container']}></div>;
};

export default BackgroundImg;
