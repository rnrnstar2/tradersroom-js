import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginTypescript from "@rollup/plugin-typescript";
import { babel as pluginBabel } from "@rollup/plugin-babel";
import { terser as pluginTerser } from "rollup-plugin-terser";

import * as path from "path";
import pkg from "./package.json";

// upperFirst(camelCase(pkg.name.replace(/^\@.*\//, "")));
const moduleName = "Partners";
console.log(moduleName);

const banner = `/*!
  ${moduleName}.js v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

export default [
  // ブラウザ用の設定
  {
    input: "src/index.ts",
    output: [
      // uncompressed
      {
        name: moduleName,
        // ブラウザ用の出力ファイル
        file: pkg.browser,
        format: "iife",
        sourcemap: "inline",
        banner,
      },
      // minified
      {
        name: moduleName,
        file: pkg.browser.replace(".js", ".min.js"),
        format: "iife",
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        // transformMixedEsModules: true,
        extensions: [".js", ".ts"],
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
      pluginNodeResolve({
        // ブラウザ向けにバンドルする
        browser: true,
      }),
    ],
  },
  // Formリスナーのみ
  {
    input: "src/browser.ts",
    output: [
      // uncompressed
      {
        name: "browser",
        // ブラウザ用の出力ファイル
        file: "dist/browser.js",
        format: "iife",
        sourcemap: "inline",
        banner,
      },
      // minified
      {
        name: "browser",
        file: "dist/browser.min.js",
        format: "iife",
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        // transformMixedEsModules: true,
        extensions: [".js", ".ts"],
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
      pluginNodeResolve({
        // ブラウザ向けにバンドルする
        browser: true,
      }),
    ],
  },
  // ES Module用の設定
  {
    input: `src/index.ts`,
    output: [
      {
        // ES用の出力ファイル
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript(),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
    ],
  },
  // CommonJS用の設定
  {
    input: "src/index.ts",
    output: [
      {
        // CommonJS用の出力ファイル
        file: pkg.main,
        format: "cjs",
        sourcemap: "inline",
        banner,
        exports: "default",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript(),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
    ],
  },
];
