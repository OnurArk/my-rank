import { useState, useEffect } from 'react';

type Props = {
  arrLength?: number;
};

const DisplayedItemHandler = (props: Props) => {
  const [displayedImg, setDisplayedImg] = useState<number>();
  const [startSlice, setStartSlice] = useState<number>(0);
  const [endSlice, setEndSlice] = useState<number>();

  const forwardHandler = () => {
    if (
      props.arrLength &&
      displayedImg &&
      endSlice &&
      endSlice + displayedImg >= props.arrLength
    ) {
      setStartSlice(props.arrLength - displayedImg);
      setEndSlice(props.arrLength);
    } else if (displayedImg) {
      setStartSlice((curentStart) => curentStart + displayedImg);
      setEndSlice((curentEnd) => (curentEnd ? curentEnd : 0) + displayedImg);
    }
  };

  const backwardHandler = () => {
    if (displayedImg && startSlice - displayedImg <= 0) {
      setStartSlice(0);
      setEndSlice(displayedImg);
    } else if (displayedImg) {
      setStartSlice((curentStart) => curentStart - displayedImg);
      setEndSlice((curentEnd) => (curentEnd ? curentEnd : 0) - displayedImg);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;

      switch (true) {
        case newWindowWidth <= 800:
          setDisplayedImg(3);
          if (endSlice && endSlice === props.arrLength) {
            setStartSlice(endSlice - 3);
          } else {
            setEndSlice(startSlice + 3);
          }
          break;
        case newWindowWidth > 800 && newWindowWidth <= 1050:
          setDisplayedImg(4);
          if (endSlice && endSlice === props.arrLength) {
            setStartSlice(endSlice - 4);
          } else {
            setEndSlice(startSlice + 4);
          }
          break;

        case newWindowWidth > 1050 && newWindowWidth <= 1250:
          setDisplayedImg(5);
          if (endSlice && endSlice === props.arrLength) {
            setStartSlice(endSlice - 5);
          } else {
            setEndSlice(startSlice + 5);
          }
          break;
        case newWindowWidth > 1250:
          setDisplayedImg(6);
          if (endSlice && endSlice === props.arrLength) {
            setStartSlice(endSlice - 6);
          } else {
            setEndSlice(startSlice + 6);
          }
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
  }, [displayedImg, startSlice, endSlice, props.arrLength]);

  return { startSlice, endSlice, forwardHandler, backwardHandler };
};

export default DisplayedItemHandler;
