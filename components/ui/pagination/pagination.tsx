import { FC, KeyboardEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import styles from './pagination.module.css';
import Input from '../input/input';

type Props = {
  pageNum: number | null;
  currentPage: number | null;
  linkTo: string;
};

const Pagination: FC<Props> = (props) => {
  const inputRef = useRef<any>();
  const router = useRouter();

  const navigatePage = (toPage: number | string) => {
    if (props.linkTo && typeof toPage === 'number') {
      router.push(`${props?.linkTo}&page=${toPage}`);
    }
  };

  const navigatePageByInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const userEntery = +inputRef.current.value;

      if (
        props.pageNum &&
        props.linkTo &&
        typeof userEntery === 'number' &&
        userEntery > 0 &&
        userEntery <= props.pageNum
      ) {
        console.log(event.key);
        router.push(`${props?.linkTo}&page=${userEntery}`);
      } else {
        // to do show some error on input
      }
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
      <div className={styles['pagination-list']}>
        {props.pageNum &&
          pages?.map((page, index) => (
            <li
              key={index}
              className={`${styles.paginationNum} ${
                props.currentPage === page ? styles.activePag : null
              } ${typeof page === 'string' ? styles.ellipsis : null}`}
              onClick={() => navigatePage(page)}
            >
              {page}
            </li>
          ))}
      </div>
      {props.pageNum && (
        <div className={styles['input-container']}>
          <Input
            type='text'
            placeholder={`/${props.pageNum}`}
            name='pageNum'
            padding={'0.3rem 0'}
            positionText='center'
            ref={inputRef}
            onKeyDown={navigatePageByInput}
            borderRadius={10}
            autoComplete='off'
          />
        </div>
      )}
    </ul>
  );
};

export default Pagination;
