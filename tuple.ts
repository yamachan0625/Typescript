let b: [string, string, number] = ['malcolm', 'gladwell', 1963];
b = ['queen', 'elizabeth', 'ii', 1926];

// 以下二つは同じ
let trainFares: [number, number?][];
let moreTrainFares: ([number] | [number, number])[];

// 少なくとも1つの要素(とそれに続く可変長の要素)を持つ、文字列のリスト
let friends: [string, ...string[]] = ['a', 'b', 'c'];
// 不均一なリスト
let list: [number, boolean, ...string[]] = [1, true, 'a', 'b', ''];

// イミュータブルとして扱いたい場合はreadonlt修飾子をつける
let as: readonly number[] = [1, 2, 3];
let bs: readonly number[] = as.concat(4);
let three = bs[2];
as[4] = 5; // エラー
as.push(6); // エラー
