// public どこからでもアクセス可能
// protected このクラスとサブクラスのインスタンスからアクセス可能
// private このクラスのインスタンスからのみアクセス可能
{
  type Color = 'Black' | 'White';
  type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  // 駒の位置(座標)
  class Position {
    constructor(private file: File, private rank: Rank) {}

    distanceFrom(position: Position) {
      return {
        rank: Math.abs(position.rank - this.rank),
        file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
      };
    }
  }

  // チェスの駒
  // abstractが指定されたクラスは抽象クラスと呼ばれる : 抽象クラスを直接インスタンス化しようとするとエラーになる
  abstract class Piece {
    protected position: Position;
    constructor(private readonly color: Color, file: File, rank: Rank) {
      this.position = new Position(file, rank);
    }
    // サブクラスは希望すればこのメソッドをオーバーライド(上書き)することができる
    // アクセス修飾子をつけていないためデフォルトでpublicとなり他のどのコードからも読み書き可能
    moveTo(posision: Position) {
      this.position = posision;
    }

    // 抽象メソッド : 抽象クラスで使用可能。このクラスを継承したクラスで実装しなくてはいけない。実装していない場合エラーになる。
    // 実装を持てない
    abstract canMoveTo(position: Position): boolean;
  }

  // キング
  // 継承の場合継承先のクラスをインスタンス化したタイミングで継承元のクラスもインスタンス化される
  class King extends Piece {
    canMoveTo(position: Position) {
      let distance = this.position.distanceFrom(position);
      return distance.rank < 2 && distance.file < 2;
    }
  }

  class Queen extends Piece {} // クイーン
  class Bishop extends Piece {} // ビショップ
  class Knight extends Piece {} // ナイト
  class Rook extends Piece {} // ルーク
  class Pawn extends Piece {} // ポーン

  // チェスのゲームを表します
  class Game {
    private pieces = Game.makePieces();

    private static makePieces() {
      return [
        // キング
        new King('White', 'E', 1),
        new King('Black', 'E', 8),
        // クイーン
        new Queen('White', 'D', 1),
        new Queen('Black', 'D', 8),
        // ビショップ
        new Bishop('White', 'C', 1),
        new Bishop('White', 'F', 1),
        new Bishop('Black', 'C', 8),
        new Bishop('Black', 'F', 8),
      ];
    }
  }
}

// 自分の理解専用
{
  class B {
    constructor(private n1: number, private n2: number) {
      console.log('Bクラスがインスタンス化されました', n1 * n2);
    }

    add() {
      console.log('Bクラス', this.n1 * this.n2);
    }
  }

  abstract class A {
    protected b: B;
    constructor(private n1: number, private n2: number) {
      console.log('Aクラスがインスタンス化されました', n1 * n2);
      this.b = new B(1, 2);
    }

    Afunc() {
      console.log('Aクラスのやつ');
    }

    abstract canA(): void;
  }

  class C extends A {
    constructor(n1: number, n2: number) {
      super(n1, n2);
      console.log('Cクラスがインスタンス化されました', n1 * n2);
    }
    // 親クラスと同じメソッドを持っている場合こクラスのメソッドが呼ばれる

    Afunc() {
      console.log('Cクラスのやつ');
    }

    Cfunc() {
      // super.hogeで親クラスのメソッドを呼び出す
      super.Afunc();
    }

    canA() {
      this.Afunc();
    }
  }

  const instance = new C(3, 4);
  instance.Cfunc();

  // "Aクラスがインスタンス化されました",  12
  // "Bクラスがインスタンス化されました",  2
  // "Cクラスがインスタンス化されました",  12 // 継承先のconstructorは継承元が生成された後に呼ばれる。
  // "Aクラスのやつ"
}
