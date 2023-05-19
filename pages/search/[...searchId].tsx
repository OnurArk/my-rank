import { FC } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';

import ResponsiveSize from '@/components/ui/responsive-size';

import styles from '../../styles/search/searchId.module.css';

const SearchPage: FC = () => {
  const router = useRouter();

  const { imgWidth, limit } = ResponsiveSize({
    limits: { point1: 480, point2: 885, point3: 1060 },
  });

  return (
    <div>
      <div className={styles['search-container']}>
        {!router.asPath.includes('[...searchId]') && (
          <ItemsList
            path={router.asPath
              .replace('/search/', '')
              .concat(`&limit=${limit}`)}
            imgWidth={imgWidth}
            limit={limit}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
