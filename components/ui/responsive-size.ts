import { useState, useEffect } from 'react';

const ResponsiveSize = () => {
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth > 1276 ? 15 : 12
  );

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const newItemsPerPage = newWindowWidth > 1276 ? 15 : 12;
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerPage]);

  return {};
};

export default ResponsiveSize;
