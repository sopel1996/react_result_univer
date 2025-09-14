/*

Реализуйте хук useFetch(), который можно будет использовать следующим образом:

import { useFetch } from './useFetch';

function Demo() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useFetch('https://jsonplaceholder.typicode.com/posts');
  
  return (
    <div>
      <div>
        <button onClick={() => refetch({
          params: {
            _limit: 3
          }
        })}>
          Перезапросить
        </button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && 'Произошла ошибка'}
      {data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>) }
    </div>
  );
}

*/

import {useState, useEffect} from 'react';
import axios from 'axios';

export function useFetch(url, options = {}) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function getFetch(opt = options) {
    setLoading(true);

    axios({
      method: 'GET',
      url,
      ...opt,
    })
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getFetch(options);
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: getFetch
  }
}