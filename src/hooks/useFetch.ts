import { useEffect, useState } from 'react';
import { useDBContext } from '../context/DbSelectContext';
//
export async function fetchData(url: string, selectedDB: any, method = 'GET') {
  const headers: any = {};

  headers['Authorization'] = `${process.env.REACT_APP_ADMIN_KEY}`;

  console.log(process.env.REACT_APP_ADMIN_KEY);

  let response = await fetch(url, {
    method: method,
    headers: headers
  });

  if (method === 'DELETE' && response.status === 204) {
    window.alert('삭제에 성공했습니다~');
    return;
  }
  if (!response.ok) throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);

  return response.json();
}

const useFetch = <T>(
  fetchFunction: (url: string, selectedDB: string) => Promise<T>,
  url: string
): T | undefined => {
  const [promise, setPromise] = useState<Promise<void>>();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<Error>();

  const { selectedDB } = useDBContext();

  useEffect(() => {
    setStatus('pending');
    setPromise(
      fetchFunction(url, selectedDB)
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
