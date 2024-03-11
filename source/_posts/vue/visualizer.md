---
title: vite 打包分析插件
date: 2024-03-08 11:10:34
type: "js"
tag: vite 打包分析 vite插件
---
### 1、安装插件
```js
pnpm install rollup-plugin-visualizer
```
###  2、在vite.confg.ts引入插件并使用

引入
```js
import { visualizer } from 'rollup-plugin-visualizer';
```

使用
```js
const plugins = [vue(), vueSetupExtend(), vueJsx(), visualizer()]
```

###  3、打包后，会在项目根目录下产生一个stats.html文件
![stats.html](images/企业微信截图_20240308111636.png)