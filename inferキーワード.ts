{
  // 以下二つは同等
  // 条件型で定義
  type ElementType<T> = T extends unknown[] ? T[number] : T;
  type A = ElementType<number[]>; // number

  // inferで定義
  type ElementType2<T> = T extends (infer U)[] ? U : T;
  type B = ElementType2<number[] | string>;

  // Fに型を渡した時にSecondArg<F>が確定する。Fがextendsした方を含んでいる場合はtrue。trueの場合はその時のinfer Uの位置の型を返す
  type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never;
  type F = typeof Array['prototype']['slice'];
  type AA = SecondArg<F>;
}
