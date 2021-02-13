class MessageQueue {
  // constructorにprivateがしてされているとそのクラスを拡張したりnewしたりすることはできない
  private constructor(private message: string[]) {}
}

class BadQueue extends MessageQueue {} // 拡張できない
new MessageQueue([]);

// クラスの拡張は制限するがインスタンス化はできるようにしたい
class MessageQueue2 {
  private constructor(private message: string[]) {}
  static create(messages: string[]) {
    return new MessageQueue2(messages);
  }
}

class BadQueue2 extends MessageQueue2 {} // 拡張できない
MessageQueue2.create([]); // インスタンス化できる

{
  // 拡張することはできるが、newすることはできない
  class A {
    a = 'a';
    protected constructor() {}
  }

  class B extends A {}

  new A();
  new B();
}
