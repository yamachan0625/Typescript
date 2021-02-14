function isString(a: unknown): boolean {
  return typeof a === 'string';
}
function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
  }
  // ここでエラー
  // typoeofによる型の絞り込みはスコープを離れると機能しない
  formattedInput = input.toUpperCase();
}
// booleanを返す関数の場合ユーザー定義型ガードを使用するとその関数を使う時に絞り込みが引き継がれる
function isString2(a: unknown): a is string {
  return typeof a === 'string';
}
