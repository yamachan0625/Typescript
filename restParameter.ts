// レストパラメータで上kとると配列として扱うことができる
function sum(...numbers: number[]) {
  return numbers.reduce((a, c) => a + c);
}
sum(2, 3, 4, 5); // 14

interface Console {
  log(message?: any, ...optionalParams: any[]): void;
}
