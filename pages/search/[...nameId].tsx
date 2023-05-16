import { FC } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';
import ItemsIndividual from '@/components/ui/items-individual/items-individual';

import ResponsiveSize from '@/components/ui/responsive-size';

import styles from '../../styles/search/nameId.module.css';

const SearchPage: FC = () => {
  const router = useRouter();

  // const { isGreaterLimit } = ResponsiveSize({ limit: 720 });
  console.log(router.query);

  return (
    <div>
      <div className={styles['search-container']}>
        <ItemsList query={router.query} />
      </div>
    </div>
  );
};

export default SearchPage;