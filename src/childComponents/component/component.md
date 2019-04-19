# 文件说明

> iview 部分组件的二次封装


##组件概要

* ### form-item-input组件

   该组件封装了iview中的 FormItem组件 Input组件， 可以在表单中方便的使用

* ### form-item-select组件

   该组件封装了iview中的 FormItem组件 Select组件 Option组件， 可以在表单中方便的使用

* ### form-item-datepicker组件

   该组件封装了iview中的 FormItem组件 Col组件 DatePicker组件， 分为单个日历和开始日历/结束日历两种情况

* ### form-item-btns组件

   该组件封装了iview中的 FormItem组件 Button组件， 可以在该组件里动态传入多个button相关数据，实现多个按钮的使用 

* ### form-items组件

   该组件抽象了以上的四种组件，通过传入表单的相关属性和表单每行的相关数据信息，就可以将每行各个组件及其相应的属性事件初始化，
   极大的减少了组件的代码量。

* ### com-menu组件

   该组件封装了iview中的 Menu组件 Submenu组件 MenuItem组件,并实现了无限级菜单的功能。其中的MenuItem事件，需要在数据初始化的时候就绑定。com-menu-collapsed组件是com-menu组件的collapsed状态，其用法和传参一致。

* ### com-tabs组件

   该组件封装了iview中的 Tabs组件 TabPane组件, 让该组件使用更加简洁

##文件目录说明

   form-item文件夹下放入了表单相关组件，menu文件夹下放入了menu相关组件，tabs文件夹下是tab相关组件，bak文件夹下放入了待开发组件，demo1.vue文件是表单相关组件的demo范例，demo2.vue文件是menu和tabs组件的范例，compenent.md文件是整个文件包的说明

##使用须知

   组件使用api参见 [iview部分组件的二次封装](https://eatools.bytedance.net/wiki/pages/viewpage.action?pageId=2076521) 
   单个组件的使用：大部分的写法和iview组件参数名称和类型一致或相似。需要注意的是form-item-datepicker组件单个日历和多个日历传参的区别。
   组合组件中：name表示每个组件的类型，attr是每个组件的属性配置，具体属性和单个组件一样。需要注意，当使用组件值双向绑定时，form-item-input/form-item-select组件需要传入prop,form-item-datepicker组件需要传入startDateSync/endDateSync，否则就是单向绑定，详见demo1.vue中的使用
   com-menu-collapsed组件是com-menu组件的折叠状态，详见demo2.vue中的使用



