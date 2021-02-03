// TypeScriptが何かをunknownと推論することはない
let a: unknown = 30; // unknwon
let b = a === 123; // boolean
// let c = a + 10; // エラー

// unkownが特定の型であると想定した事柄はできない
// 値が本当にその型であることをTypeScriptに示す必要がある。
if (typeof a === 'number') {
  let d = a + 10;
}
