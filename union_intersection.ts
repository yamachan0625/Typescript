type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;
// -----------------------------------------------------------------//
// ユニオン型
// Cat
let a5: CatOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true, // のどを鳴らす
};

// Dog
a5 = {
  name: 'Domino',
  barks: true,
  wags: true,
};
// 両方
a5 = {
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true,
};

// -----------------------------------------------------------------//
// インターセクション型
let b5: CatAndDog = { name: 'Domino', barks: true, purrs: true, wags: true };
// 1つでもプロパティが欠けるとエラーになる
let b6: CatAndDog = { name: 'Domino', barks: true, purrs: true };

type Returns = string | null;
function trueOrNull(isTrue: boolean): Returns {
  if (isTrue) {
    return 'true';
  }
  return null;
}

function test(a: string, b: number) {
  return a || b;
}
// -----------------------------------------------------------------//
