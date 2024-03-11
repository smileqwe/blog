---
title: ESLint 忽略文件或目录
date: 2024-3-11 15:30:29
tags: eslint
---
在使用 ESLint 进行代码质量检查时，有时候你可能需要忽略掉一些文件或目录，不让 ESLint 对它们进行检查。以下是几种配置 ESLint 忽略文件或目录的方法：

1. **`.eslintignore` 文件**：
   在项目的根目录下创建一个 `.eslintignore` 文件，类似于 `.gitignore` 文件。在这个文件中，你可以指定要忽略的文件和目录模式。例如：

   ```
   # 忽略 node_modules 目录
   node_modules/

   # 忽略所有以 .min.js 结尾的文件
   *.min.js

   # 忽略特定的文件
   build/config.js
   ```

2. **在 `package.json` 中配置**：
   如果你不想创建一个单独的 `.eslintignore` 文件，你可以在 `package.json` 文件中添加一个 `eslintIgnore` 属性。例如：

   ```json
   {
     "name": "my-project",
     "version": "0.1.0",
     "eslintIgnore": [
       "node_modules/",
       "*.min.js",
       "build/config.js"
     ]
   }
   ```

3. **命令行参数**：
   你可以在运行 ESLint 的命令行中使用 `--ignore-path` 参数来指定一个自定义的忽略文件，或者使用 `--ignore-pattern` 来指定要忽略的模式。例如：

   ```bash
   eslint --ignore-path .mycustomignorefile
   eslint --ignore-pattern "file-to-ignore.js"
   ```

4. **在 ESLint 配置文件中指定**：
   在 ESLint 的配置文件（如 `.eslintrc.js` 或 `.eslintrc.json`）中，你可以使用 `ignorePatterns` 属性来指定要忽略的文件和目录。例如：

   ```javascript
   // .eslintrc.js
   module.exports = {
     ignorePatterns: ['node_modules/', '*.min.js', 'build/config.js'],
     rules: {
       // ...你的规则
     },
   };
   ```

   或者在 JSON 格式的配置文件中：

   ```json
   {
     "ignorePatterns": ["node_modules/", "*.min.js", "build/config.js"],
     "rules": {
       // ...你的规则
     }
   }
   ```

通常情况下，使用 `.eslintignore` 文件是最直接和常见的方式，因为它易于管理且与 `.gitignore` 类似，大多数开发者对此都很熟悉。