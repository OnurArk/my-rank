import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ItemsList from '@/components/ui/items/items-list';
import { getSearch } from '@/helpers/request-handler';
import ResponsiveSize from '@/components/ui/responsive-size';

import styles from '../../styles/search/searchId.module.css';

const SearchPage: FC = () => {
  const [endPoint, setEndPoint] = useState<string>();
  const [title, serTitle] = useState<string>('');
  const router = useRouter();

  const { imgWidth, limit } = ResponsiveSize({
    limits: { point1: 550, point2: 870, point3: 927, point4: 1098 },
  });

  useEffect(() => {
    const { title, endPoint, type } = getSearch({
      title:
        typeof router.query.searchId === 'string'
          ? router.query.searchId
          : 'Anime',
      page: router.query.page ? +router.query.page : 1,
      limit: limit,
      query: (router.query.q as string) || '',
    });
    setEndPoint(endPoint);
    serTitle(title);
  }, [limit, router.query.page, router.query.searchId, router.query.q]);

  return (
    <div>
      <div className={styles['search-container']}>
        {endPoint && router.query.searchId && (
          <ItemsList
            imgWidth={imgWidth}
            limit={limit}
            title={title}
            endPoint={endPoint}
            query={router.query}
            path={router.asPath
              .replace('/search/', '')
              .replace(/page=[^&]+(&|$)/, '')}
          />
        )}
        {!endPoint && !router.query.searchId && (
          <div className={styles['items-container']}>
            <h2 className={styles.noResult}>{'Loading...'}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
