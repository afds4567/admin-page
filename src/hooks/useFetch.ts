import { useEffect, useState } from 'react';
import { DEFAULT_URL } from '../constants/constant';
import { useDBContext } from '../context/DbSelectContext';
//
export async function fetchData(url: string, selectedDB: any, method = 'GET') {
  const accessToken = localStorage.getItem('userToken');

  const headers: any = {};

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  console.log(accessToken, method, headers);
  console.log(url);
  let response = await fetch(url, {
    method: method,
    headers: headers
  });

  console.log(response);
  const selectedURL = DEFAULT_URL[selectedDB];
  //토큰이 만료되어 401 에러가 발생하면
  if (response.status === 401) {
    try {
      //토큰을 재발급 받는다.

      const refreshResponse = await fetch(`${selectedURL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!refreshResponse.ok) throw new Error('리프레시 토큰을 받지 못했습니다.');

      const data = await refreshResponse.json();

      // 재발급 받은 토큰을 저장한다.
      localStorage.setItem('userToken', data.accessToken);

      headers['Authorization'] = `Bearer ${data.accessToken}`;

      response = await fetch(url, { method, headers, credentials: 'include' });
    } catch (error) {
      console.error(error);
    }
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
