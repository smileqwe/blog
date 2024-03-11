title: 实现一个跳跃小球loading动画
type: js
tag: 跳跃 跳跃小球  跳跃动画  loading动画
tags:
  - 跳跃 跳跃小球  跳跃动画  loading动画
categories: []
date: 2022-11-10 16:41:00
---
# 效果展示

![image](/images/理赔小帮手1.png)
![动画](images/ball3.gif)

<!-- more -->

## 分析组件结构
![image](/images/DASHENG-900x700-4.png)

从整体来看 整个loading组件包含上面的三个小球和下面的三个阴影

所以我们可以得到下面这样的html结构

```html
 <div class="wrap">
    <div>
      <div class="ball">
        <div style="--b: 1"></div>
        <div style="--b: 2"></div>
        <div style="--b: 3"></div>
      </div>
      <div class="shadow">
        <div style="--b: 1"></div>
        <div style="--b: 2"></div>
        <div style="--b: 3"></div>
      </div>
    </div>
</div>
```

## 给小球和阴影添加一些样式

```html
<style>
    /* 设置盒模型 */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    /* body 和 .demo 的作用是撑开父元素，并且将loading动画组件居中显示，看起来更好看 */
    body {
      height: 100vh;
    }
    .demo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .ball {
      position: relative;
    }
    .ball div {
      position: absolute;
      /* 使用css变量设置元素位置 */
      left: calc(40px * var(--b));
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #1e90ff;
      bottom: 0;
    }
    .shadow {
      position: relative;
    }
    .shadow div {
      position: absolute;
      left: calc(40px * var(--b));
      width: 40px;
      /* 这里设置一半的宽度，模拟一下正面视角 */
      height: 20px;
      border-radius: 50%;
      background-color: black;
      bottom: 0;
      z-index: -1;
    }
</style>
```

现在我们得到了这样一个组件

![demo1](images/1668072982098.jpg)

## 给小球添加一下动画

先做一下动画拆解。很明显三个小球的动画是一样的，都是往上弹跳，然后落下，落下触底时会有一个压缩形变，但是三个小球的动画起始时间是不一样的，这里又需要用到我们的css变量了

先定义一个小球上升，下降的动画

```html
<style>
 @keyframes jump {
    0%,
    100% {
    bottom: 0;
    }
    50% {
    bottom: 60px;
    }
}
.shadow div {
    /* 设置顺序依次是 name duration timing-function iteration-count delay */
    animation: jump 1.5s linear infinite calc(0.3s * var(--b));
}
</style>
```

现在你将得到下面这样一个动画

![1](images/ball1.gif)

它没有在碰撞底端时压缩，也没有颜色变化，现在我们为他加上这些

```html
<style>
@keyframes jump {
    0%,
    100% {
    bottom: 0;
    height: 30px;
    }
    /* 动画循环 */
    10%,
    90% {
    height: 40px;
    }
    50% {
    bottom: 60px;
    filter: hue-rotate(90deg);
    }
}
</style>
```

现在我们的小球就做好了

![2](images/ball2.gif)


## 小球阴影样式

小球阴影我们可以看到是在小球升高的过程中体积变大，并且颜色变淡，这就很好写了

```html
<style>
@keyframes shadow {
    0%,
    100% {
    /* 球体接触最低点时阴影透明度最低，尺寸最小*/
    transform: scale(1);
    opacity: 1;
    filter: blur(2px);
    }

    40%,
    60% {
    /* 球体位于最高点时阴影透明度最高，尺寸最大*/
    transform: scale(2);
    opacity: 0.1;
    filter: blur(5px);
    }
}
</style>
```