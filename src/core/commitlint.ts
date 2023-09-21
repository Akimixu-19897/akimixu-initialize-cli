//  结合commitlint 提交信息校验

import { getPackageJson } from "../utils/env";
import { writeInPkg, run } from "../utils/tool";
import fs from "fs-extra";
import { commitLintConfig } from "../template/commitlint.config";
import { getPath } from "../utils/path";

const devDependencies = [
  // 需要安装的依赖
  "@commitlint/cli@^17.0.3",
  "@commitlint/config-angular@^17.0.3",
  "commitizen@^4.2.4",
  "cz-customizable@^6.9.0",
  "@commitlint/cz-commitlint@^17.0.3",
  "inquirer@^8.0.0",
];

// commitMsg  是提交信息
const commitMsg = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1

`;

// pre-commit 是pre-commit
const preCommit = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm run pre-commit
`;

const commitlintPath = getPath("commitlint.config.js"); // 获取commitlint.config.js的路径

export const commitLintInit = async () => {
  await writeInPkg(devDependencies); // 写入package.json需要的依赖
  await run('npx husky add .husky/commit-msg "npm-run-test"'); // 安装husky 生成commit-msg

  let pkgJson = await getPackageJson(); // 获取package.json
  pkgJson["config"] = {
    // 修改commitlint.config.js中的配置
    commitizen: {
      path: "@commitlint/cz-commitlint",
    },
  };
  pkgJson.scripts["commit"] = "git add . && git-cz"; // 添加commit脚本
  fs.writeJsonSync(getPath("package.json"), pkgJson, { spaces: 2 }); // 写入package.json

  if (await fs.pathExists(commitlintPath)) {
    // 如果commitlint.config.js存在的话
    // 删除
    fs.removeSync(commitlintPath);
  }
  fs.outputFileSync(commitlintPath, commitLintConfig); // 写入commitlint.config.js
  fs.outputFileSync(getPath("./.husky/commit-msg"), commitMsg); // 写入commit-msg
  fs.outputFileSync(getPath("./.husky/pre-commit"), preCommit); // 写入pre-commit
};
