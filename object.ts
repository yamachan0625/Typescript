// {b:12}ではなく{b:number}として型推論される
// JavaScriptにおいてオブジェクトはミュータブル(変更可能)のため
const a2 = {
  b: 12,
};

//-----------------------------------------------------------------//
let c: {
  firstName: string;
  lastName: string;
} = {
  firstName: 'john',
  lastName: 'barrowman',
};
class Person {
  constructor(
    public firstName: string, // publicは「this.firstName = firstName」の // 省略表現です。
    public lastName: string
  ) {}
}
c = new Person('matt', 'smith'); // OK

//-----------------------------------------------------------------//
let a3: {
  b: number;
  c?: string;
  [key: number]: boolean; // booleanである数値プロパティを任意の数だけ持つことができる
};
a3 = { b: 1, 10: true, 20: false, 30: true };

//-----------------------------------------------------------------//
let user: {
  readonly firstName: string;
} = {
  firstName: 'abby',
};
// user.firstName = 'jhon'; // error

//-----------------------------------------------------------------//
let a4: {} = {
  toString() {
    return 3;
  },
};
// object型はプロトタイプの方に割り当て可能であることを強制する
// この例はstring型にnumberを割り当て用としてエラー
// let b4: Object = {
//   toString() {
//     return 3;
//   },
// };

//-----------------------------------------------------------------//
