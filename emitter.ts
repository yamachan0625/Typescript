{
  // worker.ts ワーカースレッド
  import { EventEmitter } from 'events';

  interface SafeEmitter<Events extends Record<PropertyKey, unknown[]>> {
    emit<K extends keyof Events>(channel: K, ...data: Events[K]): boolean;
    on<K extends keyof Events>(
      channel: K,
      listener: (...data: Events[K]) => void
    ): this;
    on(channel: never, listener: (...data: unknown[]) => void): this;
  }

  type Message = string;
  type ThreadID = number;
  type UserID = number;
  type Participants = UserID[];

  type Commands = {
    sendMessageToThread: [ThreadID, Message];
    createThread: [Participants];
    addUserToThread: [ThreadID, UserID];
    removeUserFromThread: [ThreadID, UserID];
  };
  type Events = {
    receivedMessage: [ThreadID, UserID, Message];
    createdThread: [ThreadID, Participants];
    addedUserToThread: [ThreadID, UserID];
    removedUserFromThread: [ThreadID, UserID];
  };

  // メインスレッドから送られてくるイベントをリッスンします
  let commandEmitter: SafeEmitter<Commands> = new EventEmitter();
  // メインスレッドに対してイベントを発行します
  let eventEmitter: SafeEmitter<Events> = new EventEmitter();
  // 型安全なイベントエミッターを使って、
  // メインスレッドからの入力コマンドをラップします
  onmessage = (command) =>
    commandEmitter.emit(command.data.type, ...command.data.data);
  // Workerによって発行されたイベントをリッスンし、それらをメインスレッドに送信します
  eventEmitter.on('receivedMessage', (data) =>
    postMessage({ type: 'receivedMessage', data })
  );
  eventEmitter.on('createdThread', (data) =>
    postMessage({ type: 'createdThread', data })
  );
  // その他のイベントも同様

  // メインスレッドからのsendMessageToThreadコマンドに応答します
  commandEmitter.on('sendMessageToThread', (threadId, message) =>
    console.log('OK')
  );
  // メインスレッドにイベントを送り返します
  eventEmitter.emit('createdThread', 123, [456, 789]);
}

{
  interface SafeEmitter<Events extends Record<PropertyKey, unknown[]>> {
    emit<K extends keyof Events>(channel: K, ...data: Events[K]): boolean;
    on<K extends keyof Events>(
      channel: K,
      listener: (...data: Events[K]) => void
    ): this;
    on(channel: never, listener: (...data: unknown[]) => void): this;
  }
  // main.ts メインスレッド
  type Message = string;
  type ThreadID = number;
  type UserID = number;
  type Participants = UserID[];
  type Commands = {
    sendMessageToThread: [ThreadID, Message];
    createThread: [Participants];
    addUserToThread: [ThreadID, UserID];
    removeUserFromThread: [ThreadID, UserID];
  };
  type Events = {
    receivedMessage: [ThreadID, UserID, Message];
    createdThread: [ThreadID, Participants];
    addedUserToThread: [ThreadID, UserID];
    removedUserFromThread: [ThreadID, UserID];
  };

  let commandEmitter: SafeEmitter<Commands> = new EventEmitter();
  let eventEmitter: SafeEmitter<Events> = new EventEmitter();

  let worker = new Worker('worker.ts');
  // Workerから送られてくるイベントをリッスンし、
  // 型安全なイベントエミッターを使って、それらを再発行します
  worker.onmessage = (event) =>
    eventEmitter.emit(event.data.type, ...event.data.data);
  // このスレッドによって発行されるコマンドをリッスンし、それらをWorkerに送信します
  commandEmitter.on('sendMessageToThread', (data) =>
    worker.postMessage({ type: 'sendMessageToThread', data })
  );
  commandEmitter.on('createThread', (data) =>
    worker.postMessage({ type: 'createThread', data })
  );
  // その他のコマンドも同様

  // 新しいスレッドが作成されたことをWorkerが知らせてきたときに、何かを行います
  eventEmitter.on('createdThread', (threadID, participants) =>
    console.log('create a new thread')
  );

  // コマンドをWorkerに送信します
  commandEmitter.emit('createThread', [123, 456]);
}
