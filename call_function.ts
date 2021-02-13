{
  function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
    return f(...args);
  }

  function fill(length: number, value: string): string[] {
    return Array.from({ length }, () => value);
  }

  let a = call(fill, 10, 'a');
  let b = call(fill, 10);
  let c = call(fill, 10, 'a', 'b');
}
