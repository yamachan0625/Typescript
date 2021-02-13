// callの実装(「4.2.5.2 制限付きポリモーフィズムを使って、可変長引数をモデル化する」を 参照)を、
// 2 番目の引数が stringである関数について「だけ」機能するように書き換えてください。
// そうではない関数を渡すと、コンパイル時にエラーとなるようにします。
{
  function call2<T extends [unknown, string], R>(
    f: (...args: T) => R,
    ...args: T
  ): R {
    return f(...args);
  }

  function fill2(length: number, value: string): string[] {
    return Array.from({ length }, () => value);
  }

  function fill3(length: number, value: number): number[] {
    return Array.from({ length }, () => value * 2);
  }

  call2(fill2, 10, 'a');
  call2(fill3, 10, 10); // error
}

{
  // 型安全なアサーション関数、isを実装してください。型で概略を記述することから始めます。これ は、完成したら、次のように使えるものです。
  // stringとstringを比較します
  // is('string', 'otherstring') // false
  // booleanとbooleanを比較します
  // is(true, false) // false
  // numberとnumberを比較します
  // is(42, 42) // true
  // 異なる型同士を比較すると、コンパイル時エラーになります
  // is(10, 'foo') // エラー TS2345: 型 '"foo"' の引数を型 'number' の
  // パラメーターに割り当てることはできません。
  //[難問]任意の数の引数を渡せるようにします
  // is(1, 1, 1) // true
  // is(1, 2, 3) // false

  function is<T>(a: T, ...b: [T, ...T[]]): boolean {
    return b.some((val) => val === a);
  }
  is('string', 'otherstring');
  is(true, false); // false
  is(42, 42); // true
  is(10, 'foo');
  is(1, 1, 1);
  is(1, 2, 3);
}
