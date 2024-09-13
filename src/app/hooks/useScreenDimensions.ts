import { useEffect, useState } from 'react';

export default function useScreenDimensions(listenForResize: boolean = false) {
  const [screenDimensions, setScreenDimensions] = useState<{width: number | null, height: number | null}>({
    width: null,
    height: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDimensions = () => {
      setScreenDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    updateDimensions();

    if (listenForResize) {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [listenForResize]);

  return screenDimensions;
}