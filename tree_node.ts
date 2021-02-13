type TreeNode = { value: string };
type LeftNode = TreeNode & {
  isLeaf: true;
};
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode | TreeNode];
};

let aa: TreeNode = { value: 'a' };
let bb: LeftNode = { value: 'b', isLeaf: true };
let cc: InnerNode = { value: 'c', children: [bb] };

// nodeの型がTだがextendsすることでvalueでアクセスすることができる
// Tは少なくともTreeNode型でなくてはならない
function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value),
  };
}

let a1 = mapNode(cc, (_) => _.toUpperCase());
// {
//   "value": "C",
//   "children": [
//     {
//       "value": "b",
//       "isLeaf": true
//     }
//   ]
// }
