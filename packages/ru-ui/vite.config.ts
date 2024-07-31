import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import postcsspxtoviewport from 'postcss-px-to-viewport';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: 'es5',
      rootDir: resolve('src/'),
      declaration: true,
      declarationDir: resolve('dist'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
    }),
    cssInjectedByJsPlugin({ topExecutionPriority: false }),
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 3,
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [/PC/],
          include: [/Mobile/],
          landscape: false,
        }),
      ],
    },
  },
  server: {
    host: 'localhost',
    port: 3333,
    open: true,
    strictPort: false,
    cors: true,
  },
  build: {
    lib: {
      // 组件库源码的入口文件
      entry: resolve('src/index.ts'),
      // 组件库名称
      name: '@ru/ui',
      fileName: format => `@ru/ui.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'antd'],
      output: {
        globals: {
          react: 'react',
          antd: 'antd',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
