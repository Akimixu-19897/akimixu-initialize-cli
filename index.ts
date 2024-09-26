#!/usr/bin/env node
import inquirer from "inquirer"; // 交互式命令行工具
// const inquirer = require("inquirer");
import initCli from "./src/cli";
import { answerType } from "./src/types";

const promptList = [
  {
    type: "confirm",
    message: "是否是Vue3项目",
    name: "vue3",
  },
  {
    type: "checkbox",
    message: "选择要安装的插件(默认全选)",
    name: "plugins",
    choices: [
      {
        name: "eslint注册",
        value: "eslint",
        checked: true,
      },
      {
        name: "husky注册",
        value: "husky",
        checked: true,
      },
      {
        name: "commitLint注册",
        value: "commitLint",
        checked: true,
      },
      {
        name: "vscode格式化注册",
        value: "vscode",
        checked: true,
      },
      {
        name: "jsconfig路径追踪注册(仅支持js文件)",
        value: "jsconfig",
        checked: true,
      },
    ],
  },
];

const question = async () => {
  // 运行时请使用npm run serve,避免使用nodemon，会导致arrow key 无效https://github.com/SBoudrias/Inquirer.js/issues/844#issuecomment-571412210
  const answers: answerType = await inquirer.prompt(promptList); // 交互式命令行工具
  initCli(answers);
};

question();
