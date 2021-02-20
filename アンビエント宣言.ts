import { object } from 'prop-types';

export default null;
// TypeScriptは波線でエラーを表示する
// process = {
//   env: {
//     NODE_ENV: 'production',
//   },
// };

declare let process: {
  env: {
    NODE_ENV: 'development' | 'production';
  };
};

process = {
  env: {
    NODE_ENV: 'production',
  },
};

type ToArray<T> = T extends unknown[] ? T : T[];
function toArray<T>(a: T): ToArray<T> {}

// ---------------------------------------------------------------- //
// JavaScriptモジュールを安全に使えるようにするための宣言
declare module 'module-name' {
  //module-nameは正確なimportパスと一致させる
  export type MyType = number;
  export type MyDefaultType = { a: string };
  export let myExport: MyType;
  let myDefaultExport: MyDefaultType;
  export default myDefaultExport;
}

import ModuleName from 'module-name';
ModuleName.a; // string

// インポート可能なモジュールを宣言します。それぞれのインポートはanyになります
declare module 'unsafe-module-name';
import { x } from 'unsafe-module-name'; // any
// ---------------------------------------------------------------- //
