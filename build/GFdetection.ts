// // Git file checking
// import { exec } from "child_process";
// import chalk from "chalk";
// const log = console.log;

// // 定义 Git pull 命令
// const gitPullCommand = "git pull";

// // 执行 Git pull 命令
// exec(gitPullCommand, (error, stdout, stderr) => {
//   log(chalk.hex("#646cff")(`Git pull stdout:`) + chalk.green(stdout));
//   log(chalk.hex("#646cff")(`Git pull stderr:`) + chalk.red(stderr));
//   if (error) {
//     log(
//       chalk.hex("#646cff")(`Error executing 'git pull':`) +
//         chalk.red(error.message)
//     );
//     return;
//   }

//   if (stderr) {
//     log(chalk.hex("#646cff")(`Git pull stderr:`) + chalk.red(stderr));
//     return;
//   }

//   // 检查 Git pull 输出以查看是否有冲突
//   if (stdout.includes("CONFLICT")) {
//     log(chalk.hex("#646cff")(`Git pull resulted in conflicts. Aborting.`));
//     return;
//   }

//   // 如果没有冲突，执行 Git push 命令
//   const gitPushCommand = "git push origin master && git push mirror master"; // 同时推送所有数据源,刚刚测试这个指令可以执行
//   exec(gitPushCommand, (error, stdout, stderr) => {
//     if (error) {
//       log(
//         chalk.hex("#646cff")(`Error executing 'git push':`) +
//           chalk.red(error.message)
//       );
//       return;
//     }
//     // 在执行 Git push 操作时收到的错误消息 "Git push stderr: remote: Powered by GITEE.COM [GNK-6.4]" 表示你正在将更改推送到 Gitee（码云）仓库，并且这个错误消息来自于 Gitee 服务器的响应。

//     // 这个错误消息本身并不表示推送操作失败，它只是 Gitee 服务器的通知消息。通常情况下，如果没有其他错误消息，那么你的推送操作应该已经成功完成。
//     // if (stderr) {
//     //   log(chalk.hex("#646cff")(`Git push --all [stderr]:`) + chalk.red(stderr));
//     //   return;
//     // }
//     // 推送成功
//     log(chalk.hex("#646cff")("Git push --all:") + chalk.green(` successful.`));
//   });
// });

// 使用 cross-spawn 模块，执行 Git pull 命令
import spawn from "cross-spawn";
import chalk from "chalk";

const log = console.log;
const gitPullCommand = "git pull";

// 执行 Git pull 命令
const gitPull = spawn(gitPullCommand, { stdio: "inherit", shell: true });

// 检查 Git pull 命令是否执行成功
gitPull.on("close", (code) => {
  if (code !== 0) {
    log(chalk.hex("#646cff")(`Git pull exited with code ${code}. Aborting.`));
    return;
  }

  // 如果没有冲突，执行 Git push 命令
  const gitPushCommand = "git push origin master && git push mirror master";
  const gitPush = spawn(gitPushCommand, {
    stdio: "inherit",
    shell: true,
  });

  // 检查 Git push 命令是否执行成功
  gitPush.on("close", (code) => {
    if (code !== 0) {
      log(chalk.hex("#646cff")(`Git push exited with code ${code}. Aborting.`));
      return;
    }
    // 推送成功
    log(chalk.hex("#646cff")("Git push --all:") + chalk.green(` successful.`));
  });
});
