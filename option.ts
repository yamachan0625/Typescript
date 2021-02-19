import { isValidElement } from 'react';

// 値の代 わりにコンテナ(container)を返すこと

function parse(birthday: string): Date[] {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return [];
  }
  return [date];
}

function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !Number.isNaN(date.getTime())
  );
}

function ask() {
  let result = prompt('When is your birthday?');
  if (result === null) return [];
  return [result];
}

let date = parse(ask());
date.map((d) => d.toISOString()).forEach((c) => console.info('Date is', c));

interface Option<T> {
  // 空の可能性のある Optionに対して操作を連鎖させるための方法
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  // Optionから値を取り出すための方法
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap<U>(): Option<U> {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

function Option<T>(value: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

let result = Option(6)
  .flatMap((n) => Option(n * 3))
  .flatMap((n) => new None())
  .getOrElse(7);

ask()
  .flatMap(parse)
  .flatMap((date) => new Some(date.toISOString()))
  .flatMap((date) => new Some('Date is ' + date))
  .getOrElse('Error parsing date for some reason');
