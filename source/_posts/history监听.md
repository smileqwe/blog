---
title: history监听
date: 2022-10-17 14:52:30
tags:
---
# 前言

大家都知道，通过浏览器的地址栏来改变切换页面，前端实现主要有两种方式：

①通过hash改变，利用window.onhashchange 监听。

②通过history的改变，进行js操作加载页面，然而history并不像hash那样简单，因为history的改变，除了浏览器的几个前进后退（使用 history.back(), history.forward()和 history.go() 方法来完成在用户历史记录中向后和向前的跳转。）等操作会主动触发popstate 事件，pushState，replaceState 并不会触发popstate事件，本篇文章主要解决history监听的问题，下面来看下具体实现

# 思路

我们首先完成一个订阅-发布模式，然后重写history.pushState, history.replaceState,并添加消息通知，这样一来只要history的无法实现监听函数就被我们加上了事件通知，只不过这里用的不是浏览器原生事件，而是通过我们创建的event-bus  来实现通知，然后触发事件订阅函数的执行。 废话不多说，下面我们来做具体操作。

# 订阅-发布模式示例
```js
class Dep {                  // 订阅池
    constructor(name){
        this.id = new Date() //这里简单的运用时间戳做订阅池的ID
        this.subs = []       //该事件下被订阅对象的集合
    }
    defined(){              // 添加订阅者
        Dep.watch.add(this);
    }
    notify() {              //通知订阅者有变化
        this.subs.forEach((e, i) => {
            if(typeof e.update === 'function'){
                try {
                   e.update.apply(e)  //触发订阅者更新函数
                } catch(err){
                    console.warr(err)
                }
            }
        })
    }
    
}
Dep.watch = null;

class Watch {
    constructor(name, fn){
        this.name = name;       //订阅消息的名称
        this.id = new Date();   //这里简单的运用时间戳做订阅者的ID
        this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数     
    }
    add(dep) {                  //将订阅者放入dep订阅池
       dep.subs.push(this);
    }
    update() {                  //将订阅者更新方法
        var cb = this.callBack; //赋值为了不改变函数内调用的this
        cb(this.name);          
    }
}
```

# 重写history方法，并添加window.addHistoryListener事件机制。

下面我们只需要对history的方法进行重写，并添加event-bus即可，代码如下：

```js
var addHistoryMethod = (function(){
        var historyDep = new Dep();
        return function(name) {
            if(name === 'historychange'){
                return function(name, fn){
                    var event = new Watch(name, fn)
                    Dep.watch = event;
                    historyDep.defined();
                    Dep.watch = null;       //置空供下一个订阅者使用
                }
            } else if(name === 'pushState' || name === 'replaceState') {
                var method = history[name];
                return function(){
                    method.apply(history, arguments);
                    historyDep.notify();
                }
            }
            
        }
}())

window.addHistoryListener = addHistoryMethod('historychange');
history.pushState =  addHistoryMethod('pushState');
history.replaceState =  addHistoryMethod('replaceState');
```
# 测试History事件监听

上面我们给window添加了一个addHistoryListener事件监听，类似于 addEventListener的方法，然后我们有做了history的pushState， replaceState的改写，接下来我们测试一下。

```js
window.addHistoryListener('history',function(){
    console.log('窗口的history改变了');
})
window.addHistoryListener('history',function(){
    console.log('窗口的history改变了-我也听到了');
})
history.pushState({first:'first'}, "page2", "/first")
```
观察上面结果打印；我们发现window的 history改变，我们成功的添加了事件监听！当然这里还是有缺陷的，就是少了事件的移除，有兴趣的同学可以把接下来的移除也书写一下，熟悉熟悉。
