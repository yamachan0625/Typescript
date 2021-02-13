{
  interface A {
    good(x: number): string;
    bad(x: number): string;
  }
  // interfaceは拡張元のinterfaceが拡張先の型のinterfaceに割り当て可能か確認する
  interface B extends A {
    good(x: string | number): string;
    bad(x: string): string;
  }

  // 型エイリアスの場合は拡張元と拡張先の型をよしなに結合し、エラーを回避する。よくない。
  type AA = { good(x: number): string; bad(x: number): string };
  type BB = { good(x: string | number): string; bad(x: string): string } & AA;
}
