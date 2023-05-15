import { useState, useEffect } from 'react';

type ResponseProps = {
  limit: number;
};

const ResponsiveSize = (props: ResponseProps) => {
  const [isGreaterLimit, setIsGreaterLimit] = useState<boolean>(
    window.innerWidth > props.limit ? true : false
  );

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const newIsGreaterLimit = newWindowWidth > props.limit ? true : false;
      if (newIsGreaterLimit !== isGreaterLimit) {
        setIsGreaterLimit(newIsGreaterLimit);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isGreaterLimit, props.limit]);

  return { isGreaterLimit };
};

export default ResponsiveSize;
