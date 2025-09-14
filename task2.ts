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


import { useState, useCallback, useEffect } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (
  key: string
) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  }
];

export const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(null);

  // Функция для получения значения из localStorage
  const getStoredValue = useCallback((): LocalStorageReturnValue => {
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  }, [key]);

  // Функция для установки значения в localStorage
  const setItem = useCallback((newValue: LocalStorageSetValue) => {
    try {
      window.localStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // Функция для удаления значения из localStorage
  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  // Инициализация значения при монтировании компонента
  useEffect(() => {
    const storedValue = getStoredValue();
    setValue(storedValue);
  }, [getStoredValue]);

  // Слушаем изменения localStorage в других вкладках
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        setValue(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [value, { setItem, removeItem }];
};