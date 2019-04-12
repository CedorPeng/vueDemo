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
2.初步使用vuex传递参数 刷新页面不丢失vuex传递的值使用'vuex-persistedstate'插件
3.css通过'postcss'和'less'使用'bem'规范
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
*/

