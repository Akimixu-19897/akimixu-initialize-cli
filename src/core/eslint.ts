import fs from "fs-extra";
import { writeInPkg } from "../utils/tool"; // 写入package，json方法
import { getEnv, getPackageJson } from "../utils/env";
import { getPath } from "../utils/path";
import { eslintrcFn } from "../template/eslintrc";
import { prettierrcInit } from "../template/prettierrc";

// 基础依赖
const baseDep = [
  "eslint@^7.25.0",
  "prettier@^2.7.1",
  "eslint-friendly-formatter@^4.0.1",
  "eslint-plugin-prettier@^4.0.0",
  "eslint-plugin-html@^6.2.0",
  "eslint-config-prettier@^8.5.0",
];

export const eslintInit = async () => {
  let devDependencies: string[] = baseDep;
  // 如果是vue2项目，需要安装eslint-plugin-vue@^6.2.2
  if (getEnv("isVue2")) {
    devDependencies = [...devDependencies, "eslint-plugin-vue@^6.2.2"];
  }
  // 如果是vue3项目，需要安装eslint-plugin-vue@^9.2.0
  if (getEnv("isVue3")) {
    devDependencies = [
      ...devDependencies,
      "eslint-plugin-vue@^9.2.0",
      "@typescript-eslint/parser@^5.30.7",
    ];
  }
  // 如果是react项目，需要安装eslint-plugin-react@^7.30.0
  if (getEnv("isReact")) {
    devDependencies = [
      ...baseDep,
      "eslint-plugin-react@^7.30.1",
      "eslint-plugin-jsx-a11y@^6.6.1",
      "@typescript-eslint/parser@^5.30.7",
      "@typescript-eslint/eslint-plugin@5.30.7",
    ];
  }
  // 通过writeInPkg方法写入package.json
  await writeInPkg(devDependencies), "devDependencies";

  fs.outputFileSync(getPath("./.eslintrc.cjs"), eslintrcFn()); // 写入eslintrc
  fs.outputFileSync(getPath("./.prettierrc.config.cjs"), prettierrcInit); // 写入prettierrc

  let pkgJson = await getPackageJson(); // 获取package.json
  if (pkgJson["eslintConfig"]) {
    delete pkgJson["eslintConfig"];
  }
  fs.writeJsonSync(getPath("package.json"), pkgJson, { spaces: 2 }); // 写入package.json,spaces空格数
};
