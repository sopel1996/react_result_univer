/*

Реализуйте хук useLocalStorage(), который можно будет использовать следующим образом:

import { useLocalStorage } from './useLocalStorage';

function Demo() {
  const [value, { setItem, removeItem }] = useLocalStorage('some-key');

  return (
    <div>
      <p>Значение из LocalStorage: {value}</p>
      <div>
        <button onClick={() => setItem('new storage value')}>Задать значение</button>
        <button onClick={() => removeItem()}>Удалить значение</button>
      </div>
    </div>
  );
}
Кроме того, необходимо добавить типизацию хука:

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];
Здесь мы учитываем, что в LocalStorage значения всегда хранятся в виде строк. Однако в случае, если значение по ключу key не найдено, то вернется null. 

*/


import { useState } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];

export const useLocalStorage: UseLocalStorage = key => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() => localStorage.getItem(key));

  function setItem(value: LocalStorageSetValue) {
    setValue(value);
    localStorage.setItem(key, value);
  }

  function removeItem() {
    setValue(null);
    localStorage.removeItem(key);
  }

  return [
    value,
    {
      setItem,
      removeItem,
    },
  ];
};