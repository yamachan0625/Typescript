import { info } from 'console';

interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

interface Feline {
  meow(): void;
}

//Catクラスはimplementsで指定したinterfaceが宣言している全てのメソッドを実装する必要がある
class Cat implements Animal, Feline {
  name = 'Whiskers';
  eat(food: string) {
    console.info(food);
  }
  sleep(hours: number) {
    console.info(hours);
  }
  meow() {
    console.info('Meow');
  }
}
