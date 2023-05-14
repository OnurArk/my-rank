import { FC } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';
import ItemsIndividual from '@/components/ui/items-individual/items-individual';

import styles from '../../styles/search/nameId.module.css';

const SearchPage: FC = () => {
  const router = useRouter();

  return (
    <div>
      <div className={styles['search-container']}>
        {/* <ItemsList query={router.query.nameId} /> */}
        <ItemsIndividual query={router.query.nameId} />
      </div>
    </div>
  );
};

export default SearchPage;
