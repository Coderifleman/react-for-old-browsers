import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from "node:module";

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import styles from 'rollup-plugin-styles';
import alias from '@rollup/plugin-alias';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';

const NODE_ENV = process.env.NODE_ENV || 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = createRequire(import.meta.url)("./package.json");
const extensions = ['.ts', '.tsx', '.js'];

export default {
  input: 'src/index.tsx',
  output: {
    file: pkg.browser,
    assetFileNames: pkg.style.replace('docs/', ''),
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      compact: true,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'chrome 38'
          }
        ],
        [
          '@babel/preset-react',
          {
            runtime: "classic"
          }
        ],
      ],
      extensions,
    }),
    alias({
      entries: [
        {
          find: /^~(\/.*)/,
          replacement: path.resolve(__dirname, 'src$1')
        }
      ],
      customResolver: resolve({
        extensions
      })
    }),
    resolve({
      browser: true,
      extensions
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }
    }),
    styles({
      mode: 'extract',
      modules: true,
      use: [
        'sass'
      ],
      sass: {
        includePaths: [
          path.resolve(__dirname, 'src/styles')
        ],
      },
    }),
    html({
      title: 'React for old browsers',
      fileName: 'index.html',
      attributes: {
        html: {
          lang: 'ko'
        },
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge'
        }
      ],
      publicPath: ''
    }),
    terser(),
  ],
};
