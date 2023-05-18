import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './pagination.module.css';

type Props = {
  pageNum: number | null;
  currentPage: number | null;
  linkTo: string;
};

const Pagination: FC<Props> = (props) => {
  const router = useRouter();
  const [] = useState<any>();

  const navigatePage = (toPage: number | string) => {
    if (props.linkTo && typeof toPage === 'number') {
      router.push(`${props?.linkTo}&page=${toPage}`);
    }
    if (typeof toPage === 'string') {
      // TO DO  a box takes input
    }
  };

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const generatePagination = () => {
    if (!props.pageNum || !props.currentPage) {
      return;
    }
    if (props.pageNum < props.currentPage) {
      return;
    }
    const maxDisplayedPages = 5;
    const pagination = [];
    const halfMaxPages = Math.floor(props.pageNum / 2);

    if (props.pageNum <= maxDisplayedPages) {
      pagination.push(...generateRange(1, props.pageNum));
    } else if (props.currentPage < 4) {
      pagination.push(...generateRange(1, props.currentPage + 1));
      pagination.push('...', props.pageNum);
    } else if (props.currentPage > props.pageNum - 3) {
      pagination.push(1, '...');
      pagination.push(...generateRange(props.currentPage - 1, props.pageNum));
    } else {
      pagination.push(1, '...');
      pagination.push(
        ...generateRange(props.currentPage - 1, props.currentPage + 1)
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
