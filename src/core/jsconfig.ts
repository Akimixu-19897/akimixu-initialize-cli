import fs from "fs-extra";
import { getPath } from "../utils/path";
import { jsconfigTemplate } from "../template/jsconfig";

export const jsconfigInit = async () => {
  fs.outputFileSync(getPath("./jsconfig.json"), jsconfigTemplate); // 写入jsconfig
};
