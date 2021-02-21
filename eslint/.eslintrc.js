module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // eslintがtypescriptのコードを理解できるようにする
  rules: {
    'no-parameter-properties': 'error', // 実装したルールの指定
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended', // eslint:recommendedで、ESLint 本体に含まれる、通常の JavaScript と共通のお勧めのルー流を有効にする
    'plugin:@typescript-eslint/eslint-recommended', // eslint:recommendedに含まれるお勧めのルールのうち、TypeScript の型チェッカー でカバーできるものを無効にします。
    'plugin:@typescript-eslint/recommended', //TypeScript特有のお勧めのルー ルのうち、型チェックが不要なルールを有効にします。
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // TypeScript特有のお勧めのルー ルのうち、型チェックが必要なルールを有効にします。
    'prettier/@typescript-eslint', // eslintに含まれつルールのうちprettierでカバーできるものを無効にする
    'plugin:prettier/recommended', // オススメルールを有効にする
  ],
}
