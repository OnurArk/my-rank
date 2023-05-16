import { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './pagination.module.css';

type Props = {
  pageNum: number | null;
  currentPage: number | null;
  linkTo: string;
};

const Pagination: FC<Props> = (props) => {
  const router = useRouter();

  const navigatePage = (toPage: number | string) => {
    if (props.linkTo) {
      router.push(`${props?.linkTo}/${toPage}`);
    }
  };

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const generatePagination = () => {
    const maxDisplayedPages = 3;
    const halfMaxPages = Math.floor(maxDisplayedPages / 2);
    const pagination = [];

    if (!props.pageNum || !props.currentPage) {
      return;
    }

    if (props.pageNum <= maxDisplayedPages + 2) {
      pagination.push(...generateRange(1, props.pageNum));
    } else if (props.currentPage <= halfMaxPages + 1) {
      pagination.push(...generateRange(1, halfMaxPages + 1));
      pagination.push('...', props.pageNum);
    } else if (props.currentPage >= props.pageNum - halfMaxPages) {
      pagination.push(
        1,
        '...',
        ...generateRange(props.pageNum - halfMaxPages, props.pageNum)
      );
    } else {
      pagination.push(1, '...');
      pagination.push(
        ...generateRange(
          props.currentPage - halfMaxPages,
          props.currentPage + halfMaxPages
        )
      );
      pagination.push('...', props.pageNum);
    }

    return pagination;
  };

  const pages = generatePagination();

  return (
    <ul className={styles.pagination}>
      {pages?.map((page, index) => (
        <li
          key={index}
          className={`${styles.paginationNum} ${
            props.currentPage === page ? styles.activePag : null
          }`}
          onClick={() => navigatePage(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
