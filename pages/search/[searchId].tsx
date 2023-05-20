import { FC } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';

import { getSearch } from '@/helpers/request-handler';
import ResponsiveSize from '@/components/ui/responsive-size';

import styles from '../../styles/search/searchId.module.css';

const SearchPage: FC = () => {
  const router = useRouter();

  const { imgWidth, limit } = ResponsiveSize({
    limits: { point1: 480, point2: 885, point3: 1060 },
  });
  console.log(router.query);

  const { title, endPoint, type, toPagination } = getSearch({
    title:
      typeof router.query.searchId === 'string'
        ? router.query.searchId
        : 'Anime',
    page: router.query.page ? +router.query.page : 1,
    limit: limit,
    query: (router.query.q as string) || '',
  });
  console.log(endPoint);

  return (
    <div>
      <div className={styles['search-container']}>
        {endPoint && (
          <ItemsList
            imgWidth={imgWidth}
            limit={limit}
            title={title}
            endPoint={endPoint}
            query={router.query}
            toPagination={toPagination}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
