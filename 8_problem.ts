// 1. 汎用的なpromisify関数を実装してください。
// promisifyは、1つの引数と1つのコールバック を取る任意の関数をパラメーターとして取り、
// それを、プロミスを返す関数の中にラップします。
function promisify<T, A>(
  f: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T> {
  return (arg: A) => {
    return new Promise<T>((resolve, reject) => {
      f(arg, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result === null) {
          return reject(null);
        }
        resolve(result);
      });
    });
  };
}

import { readFile } from 'fs';
let readFilePromise = promisify(readFile);
readFilePromise(__dirname + '/exercises.js').then((result) =>
  console.log('done', result)
);
async function a() {
  const result = await readFilePromise(__dirname + '/exercises.js');
  console.log(result);
}
