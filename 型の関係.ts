type Options = { baseURL: string; cacheSize?: number; tier?: 'prod' | 'dev' };
class API {
  constructor(private options: Options) {}
}

new API({ baseURL: 'http://api.com', tier: 'prod' });

new API({ baseURL: 'http://api.com', badTier: 'prod' }); // 渡すオブジェクトはフレッシュなので感情プロパティチェクを行いbadTierプロパティの存在が明らかになる

new API({ baseURL: 'http://api.com', badTier: 'prod' } as Options); // 型アサーションを利用し、無効なオブジェクトをOprtuonsであると主張する。

let badOptions = { baseURL: 'http://api.com', badTier: 'prod' }; // 変数に割り当てるとフレッシュではないとみなし、過剰プロパティチェックから撤退する。
new API(badOptions);

let options: Options = { baseURL: 'http://api.com', badTier: 'prod' }; // 明示的に型付けするとフレッシュとなりk城プロパティチェックを実行する。
new API(options);
