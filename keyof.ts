function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}
type ActivityLog = {
  lastEvent: string;
  events: {
    id: string;
    timestamp: string;
    type: 'Read' | 'write';
  }[];
};
let activityLog: ActivityLog = {
  lastEvent: '2020/12/12',
  events: [
    {
      id: 'aaa',
      timestamp: '2020/12/12',
      type: 'Read',
    },
  ],
};
// 形状の方をp性格かつ安全に表現できる
let lastEvent = get(activityLog, 'lastEvent');

// オーバーロードされた関数シグネチャを宣言する
// getを1,2,3つのキーで呼び出すためのケースを指定する
type Get = {
  <O extends object, K1 extends keyof O>(o: O, k1: K1): O[K1];
  <O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(
    o: O,
    k1: K1,
    k2: K2
  ): O[K1][K2];
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    o: O,
    k1: K1,
    k2: K2,
    k3: K3
  ): O[K1][K2][K3];
};

let get2: Get = (object: any, ...keys: string[]) => {
  let result = object;
  keys.forEach((k) => (result = result[k]));
  return result;
};

get2(activityLog, 'events', 0, 'type');
get2(activityLog, 'bad');
