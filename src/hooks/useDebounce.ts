import { useRef, useEffect } from 'react';

const useDebounce = () => {
  const timeout = useRef<number | undefined>();

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => (...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = window.setTimeout(() => func(...args), wait);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return { debounce };
};

export default useDebounce;