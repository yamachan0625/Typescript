type UserTextEvent = { value: string; target: HTMLInputElement };
type UserMouseEvent = { value: [number, number]; target: HTMLElement };
type UserEvent = UserTextEvent | UserMouseEvent;
function handle(
  event: UserEvent /** UserTextEventまたはUserMouseEventを渡さなければいけないこと意味しない */
) {
  if (typeof event.value === 'string') {
    event.value; // string
    event.target; // HTMLInputElement | HTMLElement (!!!)
    // ...
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLInputElement | HTMLElement (!!!)
}

// タグ付き合併型を利用し書き直す
type UserTextEvent2 = {
  type: 'TextEvent';
  value: string;
  target: HTMLInputElement;
};
type UserMouseEvent2 = {
  type: 'MouseEvent';
  value: [number, number];
  target: HTMLElement;
};
type UserEvent2 = UserTextEvent2 | UserMouseEvent2;

function handle2(event: UserEvent2) {
  // タグつけされたフィールドに基づいて絞り込む
  if (event.type === 'TextEvent') {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }

  event.value; // [number,number]
  event.target; // HTMLElement
}
