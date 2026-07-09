import { useState, useEffect } from 'react';

// a hook for keeping a state variable synchronized with a local storage key
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    console.log("item:");
    console.log(typeof(item));
    console.log(item);
    return item != null ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// example:
// const [name, setName] = useLocalStorage('name', 'Guest');