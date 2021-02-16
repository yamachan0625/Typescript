{
  type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  type Day = Weekday | 'Sat' | 'Sun';
  // Record型 keyはstring | number | symbol
  let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue',
    Tue: 'Tue',
    Wed: 'Tue',
    Thu: 'Tue',
    Fri: 'Tue',
  };

  // マップ型 keyはオブジェクトのキーのリテラル型になる
  let nextDay2: { [K in Weekday]: Day } = {
    Mon: 'Tue',
  };

  type Account = { id: number; isEmployee: boolean; notes: string[] };
  // 全てのフィールドを省略可能にする Partial<Object>
  type OptionalAccount = {
    [K in keyof Account]?: Account[K];
  };
  // 全てのフィールドをnull許容に
  type NullableAccount = {
    [K in keyof Account]: Account[K] | null;
  };
  // 全てのフィールドを読み取り専用に Readonly<Object>
  type ReadonlyAccount = {
    readonly [K in keyof Account]: Account[K];
  };
  // すべてのフィールドを再び書き込み可能にします(Accountと同等)
  type Account2 = {
    -readonly [K in keyof ReadonlyAccount]: Account[K];
  };
  // すべてのフィールドを再び必須にします(Accountと同等)
  type Account3 = {
    [K in keyof OptionalAccount]-?: Account[K];
  };
}
