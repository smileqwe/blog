beforeCreate 组件实例创建之初  此时数据data和方法methods都还未绑定

created 组件实例已经创建  此时已经能够访问到data和methods 但是 dom还未被创建 

beforeMount 组件挂载前 组件在此时需要判断el是否被创建，如果未被创建，需要在显示调用vm.$mount后才会创建

mounted 此时dom已经挂载并渲染

beforeUpdate

updated

destory