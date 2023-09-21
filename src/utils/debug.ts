import chalk from "chalk";

let debugSwitch = true;
const log = console.log;

// debug开关,默认开启
export const switchDebug = (debug: boolean) => {
  debugSwitch = debug;
};
// debug 信息
export const debugInfo = (msg: string) => {
  debugSwitch &&
    log(chalk.hex("#646cff")(`[akimixu-initialize-cli]:`) + chalk.green(msg));
};

// 报错信息
export const debugError = (msg: string) => {
  debugSwitch &&
    log(chalk.hex("#646cff")(`[akimixu-initialize-cli]:`) + chalk.red(msg));
  process.exit(0);
};

// 警告
export const debugWarning = (msg: string) => {
  log(chalk.hex("#646cff")(`[akimixu-initialize-cli]:`) + chalk.yellow(msg));
};

//
export const debugProcess = (msg: string) => {
  debugSwitch &&
    log(chalk.hex("#646cff")(`[akimixu-initialize-cli]:`) + chalk.yellow(msg));
};
// debugTxt
export const debugTxt = (msg: string) => {
  log(chalk.hex("#646cff")(`[xianzao-cli]:`) + chalk.hex("#5c6d82")(msg));
};
