// Git file checking
import { exec } from "child_process";
import chalk from "chalk";
const log = console.log;

// 定义 Git pull 命令
const gitPullCommand = "git pull origin master";

// 执行 Git pull 命令
exec(gitPullCommand, (error, stdout, stderr) => {
  if (error) {
    log(
      chalk.hex("#646cff")(`Error executing 'git pull':`) +
        chalk.red(error.message)
    );
    return;
  }

  if (stderr) {
    log(chalk.hex("#646cff")(`Git pull stderr:`) + chalk.red(stderr));
    return;
  }

  // 检查 Git pull 输出以查看是否有冲突
  if (stdout.includes("CONFLICT")) {
    log(chalk.hex("#646cff")(`Git pull resulted in conflicts. Aborting.`));
    return;
  }

  // 如果没有冲突，执行 Git push 命令
  const gitPushCommand = "git push origin master";
  const gitPushMirrorCommand = "git push mirror master";
  exec(gitPushCommand, (error, stdout, stderr) => {
    if (error) {
      log(
        chalk.hex("#646cff")(`Error executing 'git push':`) +
          chalk.red(error.message)
      );
      return;
    }

    if (stderr) {
      log(chalk.hex("#646cff")(`Git push stderr:`) + chalk.red(stderr));
      return;
    }
    log(chalk.hex("#646cff")(`Git push origin successful.`));
  });

  exec(gitPushMirrorCommand, (error, stdout, stderr) => {
    if (error) {
      log(
        chalk.hex("#646cff")(`Error executing 'git push mirror':`) +
          chalk.red(error.message)
      );
      return;
    }
    if (stderr) {
      log(chalk.hex("#646cff")(`Git push stderr:`) + chalk.red(stderr));
      return;
    }
    log(chalk.hex("#646cff")(`Git push mirror successful.`));
  });
});
