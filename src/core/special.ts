// 对vue3的特殊处理
import fs from "fs-extra";
import { env, getPackageJson } from "../utils/env";
import { getPath } from "../utils/path";

export const specialFn = async () => {
  const { isVue3 } = env; // 获取环境变量值
  if (!isVue3) return;
  let pkgJson = await getPackageJson(); // 获取package.json
  // 如果是vue3的话，需要把package.json中的type="module"去掉
  if (pkgJson.type) {
    delete pkgJson["type"];
  }
  fs.writeJsonSync(getPath("package.json"), pkgJson, { spaces: 2 }); // 写入package.json
};
