/*

Реализуйте хук useHover(), который можно будет использовать следующим образом:

import { useHover } from './useHover';

function Demo() {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      {hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
    </div>
  );
}

*/


import { useState, useRef, useCallback, useEffect } from 'react';

export const useHover = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { hovered, ref };
};