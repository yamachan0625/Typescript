class Set {
  has(value: number): boolean {
    //
  }
  // thisはSetの中ではSetのインスタンスを指し、MutableSetの中ではMutableSetを指し示す
  add(value: numebr): this {
    //
  }
}

class MutableSet extends Set {
  delete(value: number): boolean {
    //
  }
  // thisを使うことでオーバーライドの必要がなくなる
  // add(value: number): MutableSet {
  //   // ...
  // }
}
