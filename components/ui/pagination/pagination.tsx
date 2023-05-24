import { FC, KeyboardEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import Input from '../input/input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './pagination.module.css';

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
      const updatedLink = props.linkTo.concat(`page=${toPage}`);

      router.push(updatedLink);
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
        const updatedLink = props.linkTo.concat(`page=${userEntery}`);
        router.push(updatedLink);
      } else {
        // to do show some error on input
      }
    }
  };

  const navigateForward = () => {
    if (
      props.linkTo &&
      props.currentPage &&
      props.currentPage !== props.pageNum
    ) {
      const updatedLink = props.linkTo.concat(`page=${props.currentPage + 1}`);

      router.push(updatedLink);
    }
  };

  const navigateBackward = () => {
    if (props.linkTo && props.currentPage && props.currentPage > 1) {
      const updatedLink = props.linkTo.concat(`page=${props.currentPage - 1}`);

      router.push(updatedLink);
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
      {props.pageNum && (
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={styles.icon}
          onClick={navigateBackward}
        />
      )}
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
            placeholder={`${props.currentPage} / ${props.pageNum}`}
            name='pageNum'
            positionText='center'
            ref={inputRef}
            onKeyDown={navigatePageByInput}
            autoComplete='off'
            className={styles.input}
          />
        </div>
      )}
      {props.pageNum && (
        <FontAwesomeIcon
          icon={faAngleRight}
          className={styles.icon}
          onClick={navigateForward}
        />
      )}
    </ul>
  );
};

export default Pagination;
