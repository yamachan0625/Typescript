declare const foo: Function

class MyClass {
  private ng3: RegExp | undefined
  protected ng2: number
  public readonly ng1: boolean
  private ok1 = 1
  ok2 = !this.ng1
  constructor(ok3: string, ng1: boolean, @foo ng2 = 1, ng3?: RegExp) {
    this.ng3 = ng3
    this.ng2 = ng2
    this.ng1 = ng1
  }
}
