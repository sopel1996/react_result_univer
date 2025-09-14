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


import { useState, useEffect, useRef, useCallback } from 'react';

export function useHover() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mouseenter', onMouseEnter);
      ref.current.addEventListener('mouseleave', onMouseLeave);

      return () => {
        ref.current?.removeEventListener('mouseenter', onMouseEnter);
        ref.current?.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    return undefined;
  }, []);

  return { ref, hovered };
}