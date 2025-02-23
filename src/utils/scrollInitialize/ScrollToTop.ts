'use client';

import { useEffect } from 'react';
import { useRouter as useLocation } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
