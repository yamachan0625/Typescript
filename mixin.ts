{
  // クラスのコンストラクターを定義。コンストラクターとはnewできるものである。
  // どのようなパラメーターの型を持つかわからないので任意の方の任意の数の引数をとると表現
  type ClassConstructor<T> = new (...args: any[]) => T;

  function withEZDebug<C extends ClassConstructor<{ getDebugValue(): object }>>(
    Class: C
  ) {
    return class extends Class {
      // constructorのなかに追加のロジックを持たない場合は、省略できる
      // constructor(...args: any[]) {
      //   super(...args);
      // }
      debug() {
        let Name = this.constructor.name;
        let value = this.getDebugValue();
        return Name + '(' + JSON.stringify(value) + ')';
      }
    };
  }

  class HardToDebugUser {
    constructor(
      private id: number,
      private firstName: string,
      private lastName: string
    ) {}
    getDebugValue() {
      return { id: this.id, name: this.firstName + '' + this.lastName };
    }
  }

  let User = withEZDebug(HardToDebugUser);
  let user = new User(3, 'Emma', 'Gluzman');
  user.debug();
}
