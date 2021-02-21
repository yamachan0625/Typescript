"use strict";
exports.__esModule = true;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
// ESLintUtils.RuleCreator()の引数には、ルール名を引数に取り、そのルールについてのド キュメントの URL を返す関数を渡す
// 今回はnpmに後悔しないので引数をそのまま返すだけの間酢を渡す
var createRule = experimental_utils_1.ESLintUtils.RuleCreator(function (name) { return name; });
// 取得した間酢を使ってルールを作成し、exportする
module.exports = createRule({
    name: 'no-parameter-properties',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow parameter properties of classes',
            category: 'Stylistic Issues',
            recommended: false
        },
        messages: {
            parameterProperty: 'Parameter property {{name}} is not allowed.'
        },
        schema: [],
        fixable: 'code'
    },
    defaultOptions: [],
    // ルールの実装を記述
    // この関数の戻り値は、検出したいASTのノー ドのタイプをキーとし、そのノードを検出した際に実行するハンドラーを値とするオブジェクト です。
    create: function (ctx) { return ({
        // TSParameterPropertyのノードを検出したいため、TSParameterPropertyを キーに含むオブジェクトを返します。
        TSParameterProperty: function (node) {
            var name = (node.parameter.type === experimental_utils_1.AST_NODE_TYPES.Identifier
                ? node.parameter
                : node.parameter
                    .left).name;
            ctx.report({
                // ctx.report()メソッドで問題を報告
                node: node,
                messageId: 'parameterProperty',
                data: { name: name },
                // fixプロパティで自動修正の処理を実装した関数を渡す。
                // 今回実装する自動修正は修正が三箇所に渡るためTSESLint.RuleFixerオブジェクトの配列を返す
                fix: function (fixer) {
                    var _a, _b, _c, _d;
                    // ctxオブジェクトから型チェッカーとTSParameterPropatyのノードに対応するTypeScriptのASTのノードを取得する
                    var typeChecker = (_b = (_a = ctx.parserServices) === null || _a === void 0 ? void 0 : _a.program) === null || _b === void 0 ? void 0 : _b.getTypeChecker();
                    var tsNode = (_d = (_c = ctx.parserServices) === null || _c === void 0 ? void 0 : _c.esTreeNodeToTSNodeMap) === null || _d === void 0 ? void 0 : _d.get(node);
                    if (!typeChecker || !tsNode) {
                        throw new Error('Missing "parserOptions.project" for @typescript-eslint/parser.');
                    }
                    // TypeScriptのASTのノードからpublicやreadonlyなどの修飾子のノードを取得
                    // パラメータプロパティには必ず修飾子が存在するため!でundefinedの考慮をしない
                    var modifires = tsNode.modifiers;
                    // 取得した修飾子ノードからクラス本文でプロパティを宣言するときに使うpublicやreadonlyのような文字列を生成する
                    var modifiersString = modifires
                        .map(function (modi) { return modi.getText(); })
                        .join('');
                    // 修正対象となるASTのノードを取得する
                    var constructorFn = node.parent;
                    var constructorBody = constructorFn.body;
                    var classBody = constructorFn.parent
                        .parent;
                    return [
                        fixer.insertTextAfterRange(
                        // 第一引数にクラスの本文の1文字目、第２引数で指定した文字列が挿入されるようにする
                        [classBody.range[0], classBody.range[0] + 1], 
                        // 修飾子 プロパティ名: 型チェッカーにより取得した型
                        // どの位置で改行するか、分の末尾にセミコロンを含めるかといった問題はコードフォーマッターが解決すべきものであ流ので、
                        // 改行は一切せず、確実に分が区切られるようにセミコロンを挿入する
                        modifiersString + " " + name + ": " + typeChecker.typeToString(typeChecker.getTypeAtLocation(tsNode)) + ";"),
                        // もともとパラメータープロパティだった箇所に対する修正を行う
                        // 引数に修飾子の最初から最後までの位置を指定し、修飾子を完全に削除する
                        fixer.removeRange([
                            modifires[0].getStart(),
                            modifires[modifires.length - 1].getEnd(),
                        ]),
                        // コンストラクター本文に対する修正を行う
                        fixer.insertTextAfterRange([constructorBody.range[0], constructorBody.range[0] + 1], "this." + name + " = " + name + ";" // this.ng1 = ng1;のような文字列を代入する
                        ),
                    ];
                }
            });
        }
    }); }
});
