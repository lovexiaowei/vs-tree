import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { eslint } from 'rollup-plugin-eslint'
import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
// import writeC from './writeC'
const isDev = process.env.NODE_ENV !== 'production'

const postcssPlugin = [
  autoprefixer
]

const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

const tsPlugin = ts({
  tsconfig: './tsconfig.json',
  useTsconfigDeclarationDir: true,
  extensions
})

if (!isDev) {
  postcssPlugin.push(cssnano)
}

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/vs-tree.esm.browser.js',
      format: 'es'
    },
    {
      file: 'dist/vs-tree.js',
      format: 'umd',
      name: 'VsTree'
      // exports: 'named'
    }
  ],
  plugins: [
    serve({
      host:'127.0.0.1',
      contentBase: '',  //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8022   //端口号，默认10001
    }),
    livereload('dist'),   //watch dist目录，当目录中的文件发生变化时，刷新页面
    resolve({
      extensions,
      modulesOnly: true
    }),
    json(),
    tsPlugin,
    commonjs(),
    // eslint({
    //   // fix: true,
    //   include: ['./src/**/**.js'],
    //   exclude: ['node_modules/**', 'src/less/**']
    // }),
    babel({
      babelHelpers: 'bundled',
      extensions: extensions
    }),
    postcss({
      plugins: postcssPlugin,
      extract: 'vs-tree.css'
    }),
    !isDev && terser()
  ]
}
