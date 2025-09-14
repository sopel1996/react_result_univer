/*

import { useWindowScroll } from './useWindowScroll';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
      <p>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
    </div>
  );
}

*/

import { useState, useCallback } from 'react';
import { useWindowEvent } from './useWindowEvent';

export function useWindowScroll() {
  const [scroll, setScroll] = useState(() => 
    typeof window !== 'undefined' 
      ? { x: window.scrollX, y: window.scrollY }
      : { x: 0, y: 0 }
  );

  const handleScroll = useCallback(() => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  }, []);

  useWindowEvent('scroll', handleScroll);

  const scrollTo = useCallback((options) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        left: options.x !== undefined ? options.x : window.scrollX,
        top: options.y !== undefined ? options.y : window.scrollY,
        behavior: 'smooth',
      });
    }
  }, []);

  return [scroll, scrollTo];
}