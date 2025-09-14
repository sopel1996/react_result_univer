/*

Реализуйте хук useViewportSize(), который можно будет использовать следующим образом:

import { useViewportSize } from '@mantine/hooks';

function Demo() {
  const { height, width } = useViewportSize();

  return (
    <>
      Width: {width}, height: {height}
    </>
  );
}
При изменении размеров viewport значения height и width автоматически обновляются. 

Примечание: для реализации можете использовать вспомогательный хук для добавления слушателей событий на window.

*/

import { useState } from 'react';
import { useWindowEvent } from './useWindowEvent';

export function useViewportSize() {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useWindowEvent('resize', () => {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  return viewportSize;
}