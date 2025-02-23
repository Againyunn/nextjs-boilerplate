'use client';

import { useEffect, useState } from 'react';

const useDisplaySize = (activate = true) => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [resizing, setResizing] = useState<number>(0);

  const resizeListener = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
    setScreenHeight(window.screenY);
    setResizing(resizing + 1);
  };

  useEffect(() => {
    resizeListener();
  }, []);

  useEffect(() => {
    if (!activate) {
      window.removeEventListener('resize', resizeListener);
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [activate]);

  return {
    innerWidth,
    innerHeight,
    screenHeight,
    resizing,
  };
};

export default useDisplaySize;
