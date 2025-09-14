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

import { useState, useEffect } from 'react';
import { useWindowEvent } from './useWindowEvent';

function getScrollPosition() {
  return typeof window !== 'undefined'
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

function scrollTo({ x, y }) {
  if (typeof window !== 'undefined') {
    const scrollOptions = { behavior: 'smooth' };

    if (typeof x === 'number') {
      scrollOptions.left = x;
    }

    if (typeof y === 'number') {
      scrollOptions.top = y;
    }

    window.scrollTo(scrollOptions);
  }
}

export function useWindowScroll() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowEvent('scroll', () => setPosition(getScrollPosition()));
  useWindowEvent('resize', () => setPosition(getScrollPosition()));

  useEffect(() => {
    setPosition(getScrollPosition());
  }, []);

  return [position, scrollTo];
}