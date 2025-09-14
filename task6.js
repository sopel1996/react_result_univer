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

import { useReducer } from 'react';

export function useToggle(options = [false, true]) {
  const [[option], toggle] = useReducer((state, action) => {
    const value = action instanceof Function ? action(state[0]) : action;
    const index = Math.abs(state.indexOf(value));

    return state.slice(index).concat(state.slice(0, index));
  }, options);

  return [option, toggle];
}