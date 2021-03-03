type Func = (arg: number) => number;
interface MyObj {
  props: string;
}

const obj: Func | MyObj = { props: '' };
obj(123); // 関数ではない可能性があるためエラー

// ---------------------------//

type StrFunc = (arg: string) => string;
type NumFunc = (arg: number) => string;
declare const obj2: StrFunc | NumFunc;
obj2(123); // string & number型を要求されるがそんな値は存在しないのでこの定義は不適切

// ---------------------------//
interface Hoge {
  foo: string;
  bar: number;
}

interface Piyo {
  foo: string;
  baz: boolean;
}

type HogeFunc = (arg: Hoge) => number;
type PiyoFunc = (arg: Piyo) => boolean;
declare const func: HogeFunc | PiyoFunc;

// func: (arg: Hoge & Piyo) => number | boolean
// オブジェクトの場合は交差型を取れる
const res = func({
  foo: 'foo',
  bar: 1,
  baz: true,
});
