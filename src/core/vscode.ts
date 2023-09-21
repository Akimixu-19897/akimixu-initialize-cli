// 设置vscode的setting.json文件
import fs from "fs-extra";
import { getPath } from "../utils/path";

export const vscodeInit = async () => {
  // 判断是否有.vscode/settings.json文件
  const haveVscodeSetting = await fs.pathExists(
    getPath(".vscode/settings.json")
  );
  let vscodeSetting = {};

  // 如果有的话,读取现在的配置
  if (haveVscodeSetting) {
    const nowSetting = fs.readJSON(getPath(".vscode/settings.json")); // 读取现在的配置
    vscodeSetting = { ...nowSetting, ...vscodeSetting };
  } else {
    vscodeSetting = {
      // 每次保存自动格式化
      "editor.formatOnSave": true,
      // 每次保存的时候将代码按eslint格式进行修复
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      },
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      // vue文件默认格式化方式vetur
      "[vue]": {
        // "editor.defaultFormatter": "octref.vetur"
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },

      "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 函数前加上空格 只有在默认vetur的时候生效
      // js文件默认格式化方式 和vue中的js保持一致使用编辑器自带的ts格式
      "[javascript]": {
        // "editor.defaultFormatter": "vscode.typescript-language-features"
        // javascript文件默认格式化方式prettier
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      // json文件默认格式化方式prettier
      "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      // css文件默认格式化方式prettier
      "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      // typescript文件默认格式化方式prettier
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },

      // 控制折行方式 - "on" (根据视区宽度折行)
      "editor.wordWrap": "on",
      "editor.tabSize": 2, // 换行默认以tab缩进 2个字符
      "editor.snippetSuggestions": "top", // 将建议的代码段优先级提前选择，比如输入for第一个提示是for循环代码段。
      "files.associations": {
        // 文件关联语言的优先级配置
        "*.js": "javascriptreact",
        "*.vue": "vue",
        "*.cshtml": "html",
        "*.dwt": "html",
      },
      // "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],

      "editor.formatOnPaste": true,
    };
  }
  // 写入配置文件
  fs.outputFileSync(
    getPath("./.vscode/setting.json"),
    JSON.stringify(vscodeSetting, null, 2)
  );
};
