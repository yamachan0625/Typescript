type VisibleDialog = { id: string };
type DestroyedDialog = {};
type Dialog = VisibleDialog | DestroyedDialog;

function closeDialog(dialog: Dialog) {
  // この段階ではDialog型だが、チェックを入れることで
  // これ以降はidが存在することが保証されVisibleDialogに絞られる
  if (!('id' in dialog)) {
    // Dialog
    return;
  }
  setTimeout(() => removeFromDOM(dialog, document.getElementById(dialog.id)!)); // VisibleDialog
}
function removeFromDOM(dialog: VisibleDialog, element: Element) {
  element.parentNode!.removeChild(element);
  delete dialog.id;
}
