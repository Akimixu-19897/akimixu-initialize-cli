<br />
<h1 align="center">akimixu-initialize-cli</h1>
<p align="center">
<a href="https://gitee.com/akimixu/akimixu-initialize-cli">
https://gitee.com/akimixu/akimixu-initialize-cli
</a>
</p>

## 目标

实现一个项目初始化 CLI，为后续项目提供统一初始化脚手架

## 实现功能

- 保存代码自动格式化
- 提交前 commit 校验
- eslint + prettier 校验
- husky 自动装载

## 使用方式

局部安装

```BASH
# 1. 项目中执行
npm i  akimixu-initialize-cli -D

# 2. 在package.json中添加script
"scripts": {
  "akimixu-initialize-cli": "akimixu-initialize-cli",
},

# 3. 执行npm run akimixu-initialize-cli, 即会自动添加依赖
  npm run akimixu-initialize-cli

# 4. 添加多个执行命令脚本
  # 按需求执行对应脚本
  # git commit  lint-staged等
```

## NPM
