# lowcode-editor

<p align="center">
  <a href="https://nodejs.org/zh-cn/download/"><img src="https://img.shields.io/badge/node%3E%3D-14.17-green" alt="node version"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-6.24-yellowgreen" alt="node version"></a>
  <a href="https://vuejs.org/index.html"><img src="https://img.shields.io/badge/vue-3.2-brightgreen" alt="vue version"></a>
   <a href="https://vuejs.org/index.html"><img src="https://img.shields.io/badge/license-MIT-blue" alt="vue version"></a>
</p>

### 使用`pnpm`来构建`monorepo`项目

1. 其中`packages`下是所有的物料以及相应的ts类型声明，将来发布到npm仓库以供线上引入。
2. `apps/editor`下是web页面的具体实现。
3. `apps/server`是对应的服务端实现。

### 规则
  1. 其中全局引入的包放在最外层的`package.json`中，安装通过`pnpm i xx -DW`进行安装。
  2. 当需要向特定的目录安装依赖请使用`pnpm i xx --filter 'editor'`。


### 使用
1. 单测
  - pnpm run test  --filter "@lc2048/shared"
  
2. 构建
  - pnpm run build -r 
  
3. web项目启动
  - pnpm run dev --filter "editor"

