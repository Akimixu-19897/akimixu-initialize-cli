import { writeInPkg, run } from "../utils/tool";
import fs from "fs-extra";
import { getPackageJson } from "../utils/env";
import { getPath } from "../utils/path";
import { pathExists } from "../utils/check";
import { debugWarning, debugInfo } from "../utils/debug";

// 需要安装的依赖
const devDependencies = ["husky@^8.0.3", "lint-staged@^12.4.1"];

//初始化
export const huskyInit = async () => {
  // 检查是否有git，如果没有，需要初始化git
  if (!(await pathExists(".git", false))) {
    debugWarning("请先初始化git"); // 警告
    debugInfo("参考命令 git init"); // 提示
    process.exit(); // 退出
  }

  // 如果有的话,安装依赖
  await writeInPkg(devDependencies); // 写入package.json

  //更改package.json中
  let pkgJson = await getPackageJson(); // 获取package.json
  pkgJson.scripts["prepare"] = "husky install"; // 添加husky脚本
  pkgJson.scripts["pre-commit"] = "lint-staged"; // 添加lint-staged脚本
  pkgJson.scripts["postinstallmac"] =
    "git config core.hooksPath .husky && chmod 700 .husky/*"; // 添加postinstallmac脚本

  pkgJson.scripts["eslint"] =
    'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,js,tsx}" --fix'; // 添加eslint脚本

  pkgJson["lint-staged"] = {
    "*.{js,ts,vue,jsx,tsx}": ["npm run eslint"],
    "*.{js,jsx,ts,tsx,md,html,css,lees,scss,sass}": "prettier --write",
    exclude: ["dist/**"],
  }; //

  fs.writeJsonSync(getPath("package.json"), pkgJson, { spaces: 2 }); // 写入package.json

  await run("npm run prepare");
  await run('npx husky add .husky/pre-commit "npm-run-pre-commit"');
};
