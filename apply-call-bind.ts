function add(a: number, b: number) {
  return a + b;
}

// 全て30と評価される;
// 第一引数をthisにバインドする
add.call(null, 10, 20);
add.apply(null, [10, 20]);
add.bind(null, [10, 20])();

// thisに型を与えることができる
function add2(this: number, a: number, b: number) {
  return this + a + b;
}

add2.apply(30, [10, 20]);

let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};
