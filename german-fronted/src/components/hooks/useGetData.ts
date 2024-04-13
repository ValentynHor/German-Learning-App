import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IVerb } from '../../data/interfaces';

type PromiseStatus = 'pending' | 'success' | 'error';

interface PromiseResult {
  status: PromiseStatus;
  data: IVerb[];
  error?: any;
  then?: any;
}

const promiseWrapper = (promise: PromiseResult) => {
  let status = 'pending';
  let result: any;

  const s = promise.then(
    (value: any) => {
      status = 'success';
      result = value;
    },
    (error: any) => {
      status = 'error';
      result = error;
    }
  );

  return () => {
    switch (status) {
      case 'pending':
        throw s;
      case 'success':
        if (result !== undefined) {
          return result;
        } else {
          throw new Error('Result is undefined');
        }
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

function useGetData(url: string): PromiseResult | null {
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: AxiosResponse = await axios.get(url);
        setResource({ status: 'success', data: response.data });
      } catch (error) {
        setResource({ status: 'error', error: error });
      }
    };

    getData();
  }, [url]);

  if (!resource) {
    return null;
  }

  return {
    status: resource.status,
    data: resource.data,
    error: resource.error,
  };
}

export default useGetData;
