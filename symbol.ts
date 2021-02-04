// const変数に割り当てる場合、TypeScriptはその型をunique symbolと推論する
const e = Symbol('e'); // typeof e
const f: unique symbol = Symbol('f'); // typeof f
let g: unique symbol = Symbol('f'); // unique symbolの変数はconstである必要がある・
let h = e === e;
let i = e === f; // unique symbolは重複しない
