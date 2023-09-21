import fs from "fs-extra";
import spawn from "cross-spawn"; // 调用子进程的方法
import { getPackageJson, getEnv } from "./env";
import { debugInfo, debugWarning } from "./debug";
import { checkNpmOrYarn } from "./check";
import { getPath } from "./path";

// hasElementInArray 判断answers的plugin数组中是否选择了安装的插件
export const hasElementInArray = (list: Array<string>, element: string) => {
  return list.indexOf(element) >= 0 ? element : "";
};

// writeInPkg 写入package.json
export const writeInPkg = async (
  devArr: string[],
  key: string = "devDependencies"
) => {
  let pkg = await getPackageJson(); // 获取package.json

  devArr.forEach((item: string) => {
    // 为了防止安装包里面的名字有@
    const index = item.lastIndexOf("@"); //
    const k = index === -1 ? item : item.slice(0, index);
    const v = index === -1 ? "" : item.slice(index + 1) || "";
    pkg[key][k] = v;
    debugInfo(`${item}✅`);
  });
  fs.writeJsonSync(getPath("package.json"), pkg, { spaces: 2 });
};

// run方法
export const run = async (str: string) => {
  const basePath = getEnv("base") as string; //  获取环境变量
  const runArr = str.split(" "); // 分割字符串
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`); // 警告
    return false;
  }
  const [npm, ...args] = runArr; // 获取npm命令
  debugInfo(`${runArr.join(" ")}✅`); // 提示
  spawn.sync(npm, args, {
    // 执行npm命令
    stdio: "pipe",
    cwd: basePath,
  });
};

// down
export const down = async (runName: string | string[], type: string) => {
  const basePath = getEnv("base") as string; // 获取环境变量值
  const [n, i] = await checkNpmOrYarn(basePath);
  if (typeof runName === "string") {
    await spawnSync(n, i, runName, type, basePath);
    return false;
  }
  runName.forEach(async (runItem) => {
    await spawnSync(n, i, runItem, type, basePath);
  });
};

export const spawnSync = (
  n: string,
  i: string,
  runItem: string,
  type: string,
  basePath: string
) => {
  return new Promise((resolve) => {
    spawn.sync(n, [i, runItem, type], {
      stdio: "pipe",
      cwd: basePath,
    });
    debugInfo(`${runItem}✅`);

    resolve({ success: true });
  });
};

// 安装依赖
export const downNodeMoudles = async () => {
  const basePath = getEnv("base") as string; // 获取环境变量值

  const [n] = await checkNpmOrYarn(basePath); // 判断使用的是npm还是yarn
  await run(`${n} install`); // 安装
};
