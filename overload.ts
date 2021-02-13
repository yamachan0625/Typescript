// from(出発日) to(帰着日)
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};

let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 宿泊旅行を予約
  } else if (typeof toOrDestination === 'string') {
    // 日帰り旅行を予約
  }
};

// 宣言された順に解決する a -> canvas ->table -> string
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement;
  (tag: 'canvas'): HTMLCanvasElement;
  (tag: 'table'): HTMLTableElement;
  (tag: string): HTMLElement;
};

function createElement2(tag: 'a'): HTMLAnchorElement;
function createElement2(tag: 'canvas'): HTMLCanvasElement;
function createElement2(tag: 'table'): HTMLTableElement;
function createElement2(tag: string): HTMLElement {
  //
}

let createElement: CreateElement = (tag: string): HTMLElement => {
  //
};
createElement('foo');

type WarnUser = { (warning: string): void; wasCalled: boolean };

function warnUser(warning: string) {
  if (warnUser.wasCalled) {
    return;
  }
  warnUser.wasCalled = true;
  alert(warning);
}
warnUser.wasCalled = false;

// warnUserを宣言したその場でwasCalledを割り当てなくてもあとで割り当てれば認識してくれる
const assignedWarnUser: WarnUser = warnUser;
