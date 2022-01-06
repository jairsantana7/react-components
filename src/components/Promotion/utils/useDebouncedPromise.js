import { useRef } from "react";

export default function useDebouncedPromise(fc, delay) {
  let timeoutRef = useRef(null);

  function handle(...params) {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setInterval(async () => {
        try {
          const response = await fc(...params);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }

  return handle;
}
