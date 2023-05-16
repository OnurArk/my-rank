import { FC } from 'react';

import styles from './pagination.module.css';

type Props = {
  pageNum: number | null;
  currentPage: number | null;
  linkTo?: 'string';
};

const Pagination: FC<Props> = (props) => {
  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
        <li key={index} className={page === '...' ? 'ellipsis' : ''}>
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
