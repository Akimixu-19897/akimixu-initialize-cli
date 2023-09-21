// 开始分析项目
import { getPackageJson, initProjectInfo } from "./utils/env"; // 从utils/env.ts中导入getPackageJson,initProjectInfo

import { answerType } from "./types";
import { specialFn } from "./core/special";
import { eslintInit } from "./core/eslint"; // 从core/eslint.ts中导入eslintInit
import { hasElementInArray } from "./utils/tool"; // 从utils/tool.ts中导入hasElementInArray
import { eslintIgnoreInit } from "./core/eslintignore";
import { huskyInit } from "./core/husky"; // 从core/husky.ts中导入huskyInit
import { commitLintInit } from "./core/commitlint";
import { vscodeInit } from "./core/vscode";
import { debugProcess, debugTxt, debugError } from "./utils/debug";

// 开始
export const start = async (base: string, answers: answerType) => {
  // 获取package.json
  const pkgJson = await getPackageJson(base); // 获取package.json,base是项目根目录

  // 交互式指令的答案解析
  const { vue3 = false, plugins = [] } = answers; // 解析答案

  await initProjectInfo(pkgJson); // 初始化项目信息

  try {
    // 对vue3模板做特殊处理
    vue3 && (await specialFn());

    // 安装eslint 和 prettier 并自动生成配置文件
    hasElementInArray(plugins, "eslint") && (await eslintInit());
    // 添加eslint忽略文件
    hasElementInArray(plugins, "eslint") && (await eslintIgnoreInit());

    // 安装 husky 并自动生成配置文件
    hasElementInArray(plugins, "husky") && (await huskyInit());

    // 生成.vscode 配置文件 支持自动格式化代码
    hasElementInArray(plugins, "commitLint") && (await commitLintInit());

    // 格式化VSCode格式
    hasElementInArray(plugins, "vscode") && (await vscodeInit());

    debugProcess(
      `恭喜您，成功注册${vue3 ? "vue3" : ""} 
      ${hasElementInArray(plugins, "eslint")}
      ${hasElementInArray(plugins, "husky")}
      ${hasElementInArray(plugins, "vscode")}
      插件`
    );

    // 部分版本依赖可能有冲突，建议重新安装node-modules
    debugProcess("请重新安装依赖！npm install or yarn");
    debugTxt(``);
  } catch (error) {
    debugError(JSON.stringify(error));
  }
};
