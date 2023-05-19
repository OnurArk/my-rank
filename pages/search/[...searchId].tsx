import { FC } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';

import ResponsiveSize from '@/components/ui/responsive-size';

import styles from '../../styles/search/nameId.module.css';

const SearchPage: FC = () => {
  const router = useRouter();

  // const { isGreaterLimit } = ResponsiveSize({ limit: 720 });
  return (
    <div>
      <div className={styles['search-container']}>
        {!router.asPath.includes('[...searchId]') && (
          <ItemsList path={router.asPath.replace('/search/', '')} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;