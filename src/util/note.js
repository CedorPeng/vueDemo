/**
 * @css通过'postcss'和'less'使用'bem'规范
 *
 * */

/**
 a.执行 npm install postcss postcss-salad --save-dev 或 npm install less less-loader --save-dev
 b.vue会直接在配置文件bulid/utils.js中添加一些依赖
 c.使用'postcss'的时候 需要在最外层工作目录中生成的'/.postcss.js'文件中 添加如下配置
 module.exports = {
      "plugins": [
        require('postcss-salad')(require('./build/salad.config.json'))
      ]
    }
 d.在bulid文件下创建salad.config.json文件,添加如下配置
 {
      "browsers": ["ie > 8", "last 2 versions"],
      "features": {
        "bem": {
          "shortcuts": {
            "component": "b",
              "modifier": "m",
              "descendent": "e"
          },
          "separators": {
            "descendent": "__",
              "modifier": "--"
          }
        }
      }
    }
 e.在页面中使用时 遵循 命名空间-模块__元素--修饰符  如 'class="model-edit__title--red"'
 f.使用postcss编译的时候
 <style lang="postcss">
 @component-namespace model{
      @b edit{
        @e title{
            font-size: 30px;
          @m red {
              color: red;
            }
          }
        }
      }
 </style>
 g.使用less编译的时候
 <style lang="less" scoped>
 @green : #458C67;//less中的变量
 .model {
      &-edit {
        &__title {
            font-size: 25px;
            color: @green;
          &--red {
              color: gray;
            }
          }
        }
      }
 </style>
 * */

/**
 * @使用vuex传值
 * */

/**
 1.传递值
 直接使用$store.dispatch
 语法 : this.$store.dispatch('传递值的actions方法',需要传递的值)
 2.接收值
 引入vuex接收值的mapGetters方法
 在computed中注册接收值的方法  语法: ...mapGetters(['getters模块中命名的方法'])
 直接使用该方法return出来的值
 例如:   直接使用this.getParams
 用vue中声明的值接收之后在使用  this.transmitValue = this.getParams

 * */

/*
* @使用v-model实现组件之间的双向数据绑定
* */
/*
  1.父组件中使用v-model绑定并传递值
  2.子组件中使用prop:[
      {
        value:{
          type:[Array,String],
          default:''
        }
      }
    ]
    用于构成双向数据流绑定；不用暴漏到外部接口。默认就是叫 value 规定死，父的绑定值就自动初始化传进来了
  3.子组件中不能直接操作v-model绑定的数值,
    需要将操作之后的值通过 this.$emit('change',改变之后的值) 将值通过change方法告知父组件并改变了双向绑定的值
 */

/*
* @export default 和 export
*  export default 只导出一个的时候 在import的时候可以 使用别的名称接收
*  export 必须使用所命名的名称去接收
* */

/*
* @设置全局过滤器
* 使用的过滤器第一个参数默认会将被处理的值传进过滤器,所传进的参数默认从第二位开始
* */

/*
* 动态style或者动态class
* <div :class="{'actice':判断是否显示的变量，'requires'：判断是否显示的变量}"></div> 多个类名需要判断
* <div :class="判断是否显示的变量 ？'actice' : ''"></div>   也可实现，适用于一个变量操作两个不同的类名
* <div :style="{padding-left: 变量或者三元运算符，left: 变量或者三元运算符 }"></div>   可多个进行操作
* */


