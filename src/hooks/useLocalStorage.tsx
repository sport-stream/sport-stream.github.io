import { useEffect, useState } from "react";

const decode = (value: any) => {
  return JSON.stringify(value);
};

const encode = (value: string | null) => {
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};

const useLocalStorage = (key: string, defaultState: any) => {
  const [value, setValue] = useState(
    encode(localStorage.getItem(key) || null) || defaultState
  );

  useEffect(() => {
    localStorage.setItem(key, decode(value));
  }, [value, key]);

  return [value, setValue];
};

export { useLocalStorage };
