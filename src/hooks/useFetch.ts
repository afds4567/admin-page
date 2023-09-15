import { useEffect, useState } from 'react';

export async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

const useFetch = <T>(fetchFunction: (url: string) => Promise<T>, url: string): T | undefined => {
  const [promise, setPromise] = useState<Promise<void>>();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setStatus('pending');
    setPromise(
      fetchFunction(url)
        .then((data) => {
          setStatus('fulfilled');
          setResult(data);
        })
        .catch((err) => {
          setStatus('error');
          setError(err);
        })
    );
  }, [url]);

  if (status === 'pending' && promise) {
    throw promise;
  }

  if (status === 'error') {
    throw error;
  }

  return result;
};

export default useFetch;
