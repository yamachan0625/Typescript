{
  // 変数を定義した時の型で推論される。配列は均一に保つ。

  let f = ['red']; // string[]で型推論される
  f.push('blue');
  f.push(true); // booleanを代入できない

  let g = []; // 初期値がから配列の場合any[]と型推論されどの型の値を代入できる
  g.push(1);
  g.push('red');
}

function buildArray() {
  // (string | number)[]型を返すはず？
  let a = [];
  a.push(1);
  a.push('x');
  return a;
}
let myArray = buildArray();
myArray.push(true); //エラーになるはず？
