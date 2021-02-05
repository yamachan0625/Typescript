type Color = 'red';
let x = Math.random() < 0.5;
if (x) {
  type Color = 'blue'; // これは、上で宣言されたColorを上書きます
  let b: Color = 'blue';
} else {
  let c: Color = 'red';
}
