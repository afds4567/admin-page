import { useState, useEffect } from 'react';

function useFetch(arg: any) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [promise, setPromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    let pending = true;
    setPromise(
      new Promise((resolve, reject) => {
        fetch(arg)
          .then((response) => response.json())
          .then((result) => {
            if (pending) {
              setData(result);
              resolve(result);
            }
          })
          .catch((err) => {
            if (pending) {
              setError(err);
              reject(err);
            }
          });
      })
    );

    return () => {
      pending = false;
    };
  }, [arg]);

  if (error) throw error;

  if (!data) throw promise;

  return data;
}

export default useFetch;
