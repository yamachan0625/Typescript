type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};
// ルックアップ型の構文で型を取得する場合は角括弧の表記法を使用する
type FriendList = APIResponse['user']['friendList'];

// keyof演算子でも同様
type UserKey = keyof APIResponse['user'];
