import path from "path";
import fs from "fs-extra";
import { checkVueVersion } from "./check";

export const env = {
  base: "",
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: false,
  isEslint: false,
};

type envKeys = keyof typeof env;

//  设置环境变量值
export const setEnv = (key: envKeys, value: any) => {
  env[key] = value as never;
};

// 获取环境变量值
export const getEnv = (key: envKeys) => {
  return env[key];
};

// 将package.json转化为json
export const getPackageJson = async (
  base: string = getEnv("base") as string
) => {
  const file = path.resolve(base, "package.json");
  const json = fs.readJson(file);
  return json;
};

// 初始化项目信息
export const initProjectInfo = async (pckJson: any) => {
  const deps = {
    ...pckJson.dependencies,
    ...pckJson.devDependencies,
  };
  // 判断是那个vue版本，还是react
  if (deps["vue"]) {
    setEnv("isVue", true);
    if (checkVueVersion(deps["vue"]) === 2) {
      setEnv("isVue2", true);
    }
    if (checkVueVersion(deps["vue"]) === 3) {
      setEnv("isVue3", true);
    }
  }

  if (deps["react"]) {
    setEnv("isReact", true);
  }
  return true;
};
