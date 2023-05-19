import { useState, useEffect } from 'react';

type ResponseProps = {
  limits: { point1: number; point2: number; point3: number };
};

const ResponsiveSize = (props: ResponseProps) => {
  const { limits } = props;

  const [imgWidth, setImgWidth] = useState<number>();
  const [limit, setLimit] = useState<number>(25);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;

      switch (true) {
        case newWindowWidth < limits.point1:
          setImgWidth(130);
          setLimit(24);
          break;
        case newWindowWidth >= limits.point1 && newWindowWidth <= limits.point2:
          setImgWidth(150);
          setLimit(24);
          break;

        case newWindowWidth >= limits.point2 && newWindowWidth <= limits.point3:
          setImgWidth(155);
          setLimit(25);
          break;
        case newWindowWidth > limits.point3:
          setImgWidth(185);
          setLimit(25);
          break;
        default:
          break;
      }
    };

    handleResize(); // Initial call to set the initial values based on the window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [limits]);

  return { imgWidth, limit };
};

export default ResponsiveSize;
