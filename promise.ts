{
  type Executor<T> = (
    resolve: (result: T) => void,
    reject: (error: unknown) => void
  ) => void;

  class Promise<T> {
    constructor(f: Executor<T>) {}
    then<U>(g: (result: T) => Promise<U> | U): Promise<U>;
    catch<U>(g: (error: unknown) => Promise<U> | U): Promise<U>;
  }

  let a: () => Promise<string>;
  let b: (s: string) => Promise<number>;
  let c: () => Promise<boolean>;

  a()
    .then(b)
    .catch((e) => c()) // bはエラーにはならないため、これはbaがエラーになった時のハンドリング
    .then((result) => console.log('done', result))
    .catch((e) => console.error('error', e));
}
