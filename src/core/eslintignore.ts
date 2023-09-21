import fs from "fs-extra";
import { getPath } from "../utils/path";

const eslintIgnore = `
.prettierrc
!commitlint.config.js
.babel.config.js
!.umirc.ts
 `;

export const eslintIgnoreInit = async () => {
  fs.outputFileSync(getPath(".eslintignore"), eslintIgnore);
};
