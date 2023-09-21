export const prettierrcInit = `
module.exports = {
  tabWidth: 2, // 首行缩进2个字符
  printWidth: 100, // 一行最大多少字符
  semi: false, // 是否每句后面都加分号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 是否使用单引号
  trailingComma: 'none', // 数组尾逗号。
  proseWrap: 'never', // markdown文本换行
  htmlWhitespaceSensitivity: 'strict',
  jsxSingleQuote: true, // 在JSX中使用单引号而不是双引号
  endOfLine: 'auto' // 行结束符
}

  
`;
