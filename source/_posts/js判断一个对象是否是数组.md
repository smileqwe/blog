---
title: js判断一个对象是否是数组
date: 2024-3-11 14:35:32
tags:
---
第一种
```js
Object.prototype.toString.call()
```

第二种
```js
Array.isArray()
```

第三种
```js
obj instanceof Array
```