type Filter = {
  (array: number[], f: (item: number) => boolean): number[];
  (array: string[], f: (item: string) => boolean): string[];
  (array: object[], f: (item: object) => boolean): object[];
};

type Filter2 = {
  // ここに<T>を設定すると関数を呼び出す時に具体的な型をTにバインドする(Typescriptがやってくれる)
  <T>(array: T[], f: (item: T) => boolean): T[];
};

let filter2: Filter2 = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

let names = [
  { firstName: 'beth' },
  { firstName: 'caitlyn' },
  { firstName: 'xin' },
];
filter2(names, (_) => _.firstName.startsWith('b'));

// ここに<T>を設定すると関数を呼び出すとにに自分たちで明示的に型をバインドする必要がある
type Filter3<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};

let filter3: Filter3<number> = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

filter3(['a', 'b'], (_) => (_) => _ !== 'b');

// --------------------------------------------------------------------------//
// promiseが返す型をアノテートする
let promise = new Promise<number>((resolve) => resolve(45));
promise.then((n) => n * 4);

// --------------------------------------------------------------------------//
// 型エイリアス名のよこが唯一ジェネリック型を宣言できる
type MyEvent<T> = {
  target: T;
  type: string;
};

let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click',
};

// TimeEventのジェネリックTがバインドされる時、MyEventにもバインドする
type TimeEvent<T> = {
  event: MyEvent<T>;
  from: Date;
  to: Date;
};
// 関すのシグネチャの中でも使用できる
function triggerEvent<T>(event: MyEvent<T>): void {}

// triggerEvent({
//   target: document.querySelector('#myButton'), // 最初の引数がTにバインドされる
//   type: 'mouseover',
// });
triggerEvent({
  target: document.querySelector('#myButton'), // 最初の引数がTにバインドされる
  type: 'mouseover',
});
