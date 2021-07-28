import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// hook 只能在组件中、或者hook中调用
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个 useEffect 处理完以后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
