// mainThread.ts
type Matrix = number[][];
type MatrixProtocol = {
  determinant: {
    in: [Matrix];
    out: number;
  };
  'dot-product': {
    in: [Matrix, Matrix];
    out: Matrix;
  };
  invert: {
    in: [Matrix];
    out: Matrix;
  };
};
type Protocol = {
  [command: string]: {
    in: unknown[];
    out: unknown;
  };
};

function createProtocol<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) => (...args: P[K]['in']) =>
    new Promise<P[K]['out']>((resolve, reject) => {
      let worker = new Worker(script);
      worker.onerror = reject;
      worker.onmessage = (event) => resolve(event.data);
      worker.postMessage({ command, args });
    });
}
let runWithMatrixProtocol = createProtocol<MatrixProtocol>(
  'MatrixWorkerScript.js' // workerインスタンスを生成したいファイルを渡す
);
let parallelDeterminant = runWithMatrixProtocol('determinant');
parallelDeterminant([
  [1, 2],
  [3, 4],
]).then((d) => console.log(d)); // -2

// 2.「8.6.1.1 型安全なプロトコル」では、型安全な行列演算のためのプロトコルの半分を作成しました。
// これをメインスレッドで実行すると仮定して、Web Workerスレッドで実行する残りの半分を実装してください。
// woekerScript.ts
type Data<P extends Protocol, C extends keyof P = keyof P> = C extends C
  ? { command: C; args: P[C]['in'] }
  : never;

function handle(
  data: Data<MatrixProtocol>
): MatrixProtocol[typeof data.command]['out'] {
  switch (data.command) {
    case 'determinant':
      return determinant(...data.args);
    case 'dot-product':
      return dotProduct(...data.args);
    case 'invert':
      return invert(...data.args);
  }
}
// onmessageでメインスレッドからdataを受け取ってworkerで計算処理をし、poseMessageで計算結果を返す
onmessage = ({ data }) => postMessage(handle(data));

declare function determinant(matrix: Matrix): number;
declare function dotProduct(matrixA: Matrix, matrixB: Matrix): Matrix;
declare function invert(matrix: Matrix): Matrix;

// 3.(「8.6.1 Web Worker(ブラウザー)」のように)マップ型を使って、
// Node.jsの`child_ process` 用の型安全なメッセージパッシングプロトコルを実装してください。
import { fork } from 'child_process';

function createProtocolCP<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) => (...args: P[K]['in']) =>
    new Promise<P[K]['out']>((resolve, reject) => {
      let child = fork(script);
      child.on('error', reject);
      child.on('message', resolve);
      child.send({ command: args });
    });
}
let runWithMatrixProtcolCP = createProtocolCP<MatrixProtocol>('./ChildThread');
let parallelDeteminantCP = runWithMatrixProtcolCP('determinant');
parallelDeteminantCP([
  [1, 2],
  [3, 4],
]).then((d) => console.log(d));

// ChildThread.ts
// type Data ...(2のWorkerScript.tsと同様)
// function handle ...(2のWorkerScript.tsと同様)
process.on('message', (data) => process.send!(handle(data)));
