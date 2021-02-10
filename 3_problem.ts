// 1. 次のそれぞれの値について、TypeScriptはどのような型を推論するでしょうか?
{
  let a = 1042;
  let b = 'apples and oranges';
  const c = 'pineapples';
  let d = [true, true, false];
  let e = { type: 'ficus' };
  let f = [1, false];
  const g = [3];
  let h = null;
}

// neverを他の全ての方に割り当てることはできるが、neverにはどんな方も割り当てられない
let k: never = 4;

let l: unknown = 4;
if (typeof l === 'number') l * 2;
