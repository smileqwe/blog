---
title: Vue3 缓存页面
date: 2021-05-30 23:24:34
type: "js"
tag: vue3 vue2 kepp-alive 缓存组件 组件缓存
---
# Vue3 缓存页面

## vue3 使用 keep-alive 缓存列表类页面

> 我们平时在开发中都会遇到列表类型的组件，不管是pc的查询，分页，还是手机端的分页，滚动位置，这类列表还经常有对应的详情页，我们希望用户进入详情页之后返回列表页时，能够展示进入详情页之前的状态，此时就要用的vue-router的keep-alive组件了

因为我们不需要缓存所有页面，比方说详情页，那我们就需要一个配置来区分哪个页面是需要缓存的，这里我们采用在 router 的 meta 信息里加上标志位的方式区分

<!-- more -->

在 router.js 中为需要缓存的组件增加 `keepAlive: true`
```js
{
    path: '/services',
    component: Services,
    meta: {
        title: '服务列表',
        requireAuth: false,
        keepAlive: true
    },
    children: []
}
```

在vue2中  我们可以使用下面的方式

```html
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

在vue3中

```html
<router-view v-slot="{ Component, route }">
    <keep-alive>
        <component
        v-if="route.meta.keepAlive"
        :is="Component"
        :key="route.path"
        />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" />
</router-view>
```