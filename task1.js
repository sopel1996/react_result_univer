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