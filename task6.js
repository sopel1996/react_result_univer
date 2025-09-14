/*

В этом задании необходимо усложнить хук useToggle(). Теперь он должен принимать массив значений, которые будут переключаться по порядку. Если ничего не передавать то будет переключать между true и false. Хук может использоваться следующим образом:

import { useToggle } from './useToggle';

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <button onClick={() => toggle()}>
      {value}
    </button>
  );
}

// Еще примеры использования

const [value, toggle] = useToggle(['light', 'dark']);

toggle(); // -> value === 'light'
toggle(); // -> value === 'dark'

// Так же можно передать конкретное значение и тогда 
// value станет одним из значений
toggle('dark'); // -> value === 'dark'
Подсказка: для реализации попробуйте использовать хук useReducer().

*/

import { useReducer, useCallback } from 'react';

function toggleReducer(state, action, values) {
  switch (action.type) {
    case 'TOGGLE': {
      const currentIndex = values.indexOf(state);
      const nextIndex = (currentIndex + 1) % values.length;
      return values[nextIndex];
    }
    case 'SET': {
      return values.includes(action.value) ? action.value : state;
    }
    default:
      return state;
  }
}

export function useToggle(values = [false, true]) {
  const [state, dispatch] = useReducer(
    (state, action) => toggleReducer(state, action, values),
    values[0]
  );

  const toggle = useCallback((value) => {
    if (value !== undefined) {
      dispatch({ type: 'SET', value });
    } else {
      dispatch({ type: 'TOGGLE' });
    }
  }, []);

  return [state, toggle];
}