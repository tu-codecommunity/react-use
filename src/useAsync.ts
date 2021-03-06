import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

export type AsyncState<T> =
  | {
      loading: true;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

export default function useAsync<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn<Result, Args>(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
