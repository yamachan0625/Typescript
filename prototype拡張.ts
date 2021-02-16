// Arrayにzipメソッドを追加しようとしていることをTypeScriptに伝える
// インターフェイスのま０時を利用してグローバルなArray<T>インターフェイスを拡張する
interface Array<T> {
  zip<U>(list: U[]): [T, U][];
}

Array.prototype.zip = function (list) {
  return this.map((v, k) => [v, list[k]]);
};

let aaa = [1, 2, 3].zip([2, 3, 4]);
