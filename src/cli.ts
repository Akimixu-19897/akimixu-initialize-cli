import cac from "cac";
import { start } from "./start";

import { name } from "../package.json";
import { getPackageJson, setEnv } from "./utils/env";
import { answerType } from "./types";

const cli = cac(name); //

export default async (answers: answerType) => {
  const pkgJson = await getPackageJson();
  const { version } = pkgJson;

  cli
    .command("[root]")
    .alias("alias")
    .action(async (root, options) => {
      console.log(root);

      let base: string = options.base;

      if (!base) {
        base = process.cwd();
      }
      setEnv("base", base);
      await start(base, answers);
    });

  cli.help();
  cli.version(version);
  cli.parse();
};
