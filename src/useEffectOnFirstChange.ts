import { useEffect, useRef } from 'react';

export const useEffectOnFirstChange = (
  func: (() => void) | (() => () => void),
  deps: React.DependencyList,
): void => {
  const hasRunned = useRef(false);
  useEffect(() => {
    if (!hasRunned.current) {
      hasRunned.current = true;
      return;
    }

    func();
  }, deps);
};

