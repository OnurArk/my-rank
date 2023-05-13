import { FC } from 'react';

import styles from './footer.module.css';

type Props = {};

const Footer: FC<Props> = () => {
  return (
    <div className={styles['footer-container']}>
      <p>This Website Made By Onur ARIK with Next.js And TypeScript</p>
    </div>
  );
};

export default Footer;
