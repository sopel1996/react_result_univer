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