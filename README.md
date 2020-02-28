# pengxucan

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

/*
1.初步季度选择器
2.初步使用vuex传递参数
3.css通过'postcss'和'less'使用'bem'规范
4.使用'vuex-persistedstate'插件  刷新页面不丢失vuex传递的值
5.通过面向对象添加一些常用的方法和正则校验
6.使用v-model实现组件之间的双向数据绑定
7.使用自定义指令优化,点击非自身控制当前组件内部的v-if
8.export default 和 export 的使用环境
9.将自己的组件通过 Vue.component(组件名,导入的文件) 方法设置为全局组件
10.将自己的工具类挂在全局this下
11.设置全局过滤器
12.初步封装D3柱图     
    a.showline(暂时拿到数据,没渲染) 
    b.双Y轴 
    c.堆叠 
    d.柱图增加tooltips 
    e.柱图增加多柱蒙层(可优化为根据参数取消和显示)    
    f.百分比堆叠图
    todo:
        1).重新整理需要被渲染的数据(setSeries)
        2).加入折线部分
        3).加入点击lenged筛选数据,重绘chart
13.初步封装折线图
    a.将数据处理setSeries
    b.处理X轴,以及Y轴数据所需要的显示的数据范围
    c.tooltips
    d.点击lenged事件
    e.设置lineStyle
    todo:将line组件设置为全局组件,并尝试进一步优化lenged图标的位置
14.在新窗口通过router打开页面
15.将柱状图和堆叠图封装成组件
    a.tooltips显示数据优化
    b.legend显示
    c.点击legend重新筛选数据,重绘chart
    d.legend别名
    e.legend为被去除的状态颜色切换
    f.根据legend数量确定位置
    todo:
        1)添加折线部分
16.柱图添加折线
    a.D3.select()方法获取当前页面(非当前组件)所有名称相同的dom(传入父组件名称解决)
    b.目前折线部分d3.line()方法只能读数组类型的值-------还需其他方法解决问题
    todo:
        1)legend部分显示折线的元素
17.百分比柱图完成
*/

