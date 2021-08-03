import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
// let a: object
// a = { name: '111'}
// a = new RegExp('')
// a = () => {}
// let b: { [key: string]: unknown }
// b = {name: '11'}
// b = () => {}
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// hook 只能在组件中、或者hook中调用, 不能在函数中使用
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加 callback 会造成无限循环， 这个和 useCallback 以及 useMemo 有关系
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
// unknown 不能赋值给任何类型
// 后面用泛型规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个 useEffect 处理完以后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialValue: T[]) => {
  // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
  const [value, setValue] = useState(initialValue)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...initialValue]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
};
