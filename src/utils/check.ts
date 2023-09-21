import fs from "fs-extra";
import { getEnv } from "./env";
import { debugError } from "./debug";

// 判断是那个vue版本
export const checkVueVersion = (version: string) => {
  const v = version.split(".")[0] as string;
  return Number(v.match(/\d+/g));
};

// 判断文件夹是否存在
export const pathExists = async (
  name: string,
  ext: boolean = true
): Promise<boolean | void> => {
  const base = getEnv("base") as string; // 获取环境变量
  const res = await fs.pathExists(`${base}/${name}`); // 获取文件夹
  if (!res) {
    ext && debugError(`${base}/${name}不存在`);
    return false;
  } else {
    return res;
  }
};

// 判断使用的是npm还是yarn
export const checkNpmOrYarn = async (_basePath?: string): Promise<string[]> => {
  // 如果原项目使用的是yarn安装的，那还是使用yarn安装
  if (await pathExists("yarn.lock", false)) {
    return ["yarn", "add"];
  }
  return ["npm", "init"];
};
