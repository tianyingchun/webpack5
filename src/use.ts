import { useEffect, useRef } from 'react';

export const useStore = (): any => {
  const curRef = useRef<null | string>('');
  useEffect(() => {
    console.log('useEffect');
    curRef.current = '1';
    return function clean() {
      console.log('useEffect clean');
      curRef.current = null;
    };
  }, []);
  return curRef;
};
