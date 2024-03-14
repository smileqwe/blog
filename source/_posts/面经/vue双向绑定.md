双向绑定，即数据和视图的响应式设计，具体表现为 `view` 的改变会导致`model`发生变化，而`model`的变化也能实时更新到`view`

多在表单情况下使用

跟单向数据流的区别是：单向数据流只有model -> view的变化是自动同步的，但是从view -> model的变化需要开发自己收集，一般是通过input或者chang事件进行收集和更新model

双向绑定在需要实时反映用户输入的场合非常方便，但是在复杂应用中，双向绑定也会带来管理上的劣势，不知道数据是何时更改的，怎么更改的

原理：vue2 是通过 Object.defineProperty方法劫持了各对象的getter和setter属性，在属性发生变更时更新视图
vue3中是通过es6的Proxy实现，替代了Object.defineProperty，实现了更好的性能

Proxy具有更好性能的原因：Object.defineProperty在面对一个深层对象时，需要对对象所有属性进行遍历，递归进行监听，但是Proxy只需要对整个对象进行一次代理，对所有属性值的更新都可以监听到

