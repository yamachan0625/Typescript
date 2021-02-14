// Tには含まれているがUには含まれていない方を計算する
// T サブタイプ Uスーパータイプ
type Without<T, U> = T extends U ? never : T;

type A = Without<boolean | number | string, boolean>;

// 合併型全体に分配
type A =
  | Without<boolean, boolean>
  | Without<number, boolean>
  | Without<string, boolean>;
// Withoutの定義に置き換える
type A =
  | (boolean extends boolean ? never : boolean)
  | (number extends boolean ? never : number)
  | (string extends boolean ? never : string);
