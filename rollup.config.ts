const clear = require("rollup-plugin-clear"); // 清除生成代码
const autoAdd = require("rollup-plugin-auto-add").default; // 自动添加依赖
const multiInput = require("rollup-plugin-multi-input").default; // 多入口
const typescript = require("rollup-plugin-typescript2"); // 解析ts
const peerDepexternal = require("rollup-plugin-peer-deps-external"); // 外部依赖
const resolve = require("rollup-plugin-node-resolve"); // 解析node_modules
const commonjs = require("rollup-plugin-commonjs"); // 解析commonjs
const filesize = require("rollup-plugin-filesize"); // 文件大小
const postcss = require("rollup-plugin-postcss"); // 解析css
const terser = require("rollup-plugin-terser").terser; // 压缩代码
const alias = require("rollup-plugin-alias"); // 别名
const path = require("path"); // nodejs path模块

const pkg = require("../package.json"); // 引入package.json

module.exports = [
  {
    input: "src/**/*",
    output: [
      {
        dir: "esm",
        format: "esm",
        sourceMap: true, // 生成sourcemap 方便调试
      },
    ],
    external: Object.keys(pkg.dependencies || {}), // 外部依赖 不打包
    plugins: [
      // 自动清除生成代码
      clear({
        targets: ["esm"],
      }),
      // 自动添加依赖
      autoAdd({
        pkg,
        include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
      }),
      // 多入口
      multiInput(),
      // 解析ts
      typescript({
        path: path.resolve(__dirname, "./tsconfig.esm.json"),
      }),
      // 外部依赖
      peerDepexternal(),
      // 解析node_modules
      resolve(),
      // 解析commonjs
      commonjs(),
      // 文件大小
      filesize(),
      // 解析css
      postcss({
        minize: true,
        sourceMap: true,
        extensions: [".css", ".less", ".scss"],
        use: ["less", "sass"],
      }),
      // 压缩代码
      terser(),
      // 别名
      alias({
        entries: [
          { find: "@", replacement: path.resolve(__dirname, "../src") },
        ],
      }),
    ],
  },
  {
    input: "src/index.tsx",
    output: [
      {
        dir: "dist",
        format: "umd",
        exports: "named",
        name: pkg.name,
        sourceMap: true, // 生成sourcemap 方便调试
      },
    ],
    external: Object.keys(pkg.dependencies || {}), // 外部依赖 不打包
    plugins: [
      // 自动清除生成代码
      clear({
        targets: ["dist"],
      }),
      // 自动添加依赖
      autoAdd({
        pkg,
        include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
      }),
      // 多入口
      multiInput(),
      // 解析ts
      typescript({
        path: path.resolve(__dirname, "./tsconfig.umd.json"),
      }),
      // 外部依赖
      peerDepexternal(),
      // 解析node_modules
      resolve(),
      // 解析commonjs
      commonjs(),
      // 文件大小
      filesize(),
      // 解析css
      postcss({
        minize: true,
        sourceMap: true,
        extensions: [".css", ".less", ".scss"],
        use: ["less", "sass"],
      }),
      // 压缩代码
      terser(),
      // 别名
      alias({
        entries: [
          { find: "@", replacement: path.resolve(__dirname, "../src") },
        ],
      }),
    ],
  },
];
