<template>
  <div class="hello">
<!--    <router-link to="/home">Home</router-link>-->
<!--    <router-link to="/station">站台</router-link>-->
<!--    <router-link to="/inputValidate">inputValidate</router-link>-->
<!--    <router-link to="/transition1">动画</router-link>-->
<!--    <router-link to="/chart">myCHart</router-link>-->

<!--    <Button type="default" @click="transmit">vuex传值</Button>-->
<!--    <Button type="default" @click="close">主动获取eventBus的值？</Button>-->

<!--    <ve-line width="1000px"  :events="chartEvent" :data="chartData"></ve-line>-->
<!--    <Button type="default" @click="exportImg">html2canvas导出视图</Button>-->
<!--    <Button type="default" @click="push">跳转</Button>-->
<!--    <Button type="default" @click="save">转PDF并导出</Button>-->

<!--    使用'bem'规范-->
<!--    <div class="model-edit__title">-->
<!--      <span>能变大吗?</span>-->
<!--      <span class="model-edit__title&#45;&#45;disabled">过时</span>-->
<!--    </div>-->


    <div class="content">
      <router-view/>
    </div>
    <!--    <div v-show="false" id="pdfDom" style="padding-top: 55px;background-color:#fff;">-->

    <!--    </div>-->
  </div>
</template>

<script>
  import {mapActions} from 'vuex'//方法一:引入vuex的mapActions方法
  import html2canvas from 'html2canvas';
  import Canvas2PDF from 'Canvas2PDF'

  export default {
    name: 'HelloWorld',
    data() {
      this.chartEvent = {
        click : function (e){
          console.log(e);
        }
      }
      return {
        msg: 'Welcome to Your Vue.js App',
        title: 'testPDF',
        pageList: {},
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        channelSetting:{
          labelMap:{
            DM:'店面',
            TB:'淘宝',
            JD:'京东',
            PYQ:'朋友圈',
            RQ:'人情',
          }
        }
      }
    },
    watch: {},
    mounted() {
      let data = require('../util/baseData').default.channelDays
      console.log(data);
    },
    created() {
      this.eventBus.$on('close',(name)=>{
        this.close(name)
      })
    },
    methods: {
      ...mapActions(['clickMapActionsParams']),//方法一:注册clickParams方法
      transmit() {
        /**
         * @用vuex传值的方法一:使用clickParams传递数据
         * */
        // this.clickMapActionsParams({id:5,name:'CedorMapActions'})

        /***
         * @用vuex传值的方法二 : 传递值
         * @直接使用$store.dispatch
         * @语法 : this.$store.dispatch('传递值的actions方法',需要传递的值)
         */
        // this.$store.dispatch('click$storeParams',{id:5,name:'Cedor$store'})
      },
      async exportImg(){
        if (!this.pageList[this.$route.name]) {
          let currentCanvas = await this.htmlToCanvas('.content');
          let imgUrl = currentCanvas.toDataURL('image/jpeg', 1.0)
          let img = document.createElement('img');
          img.src = imgUrl
          this.pageList[this.$route.name] = img;
        }
      },
      async save() {
        let canvas = this.mergeImg(this.pageList)
        this.savePdf(canvas, this.title)
      },
      push() {
        this.$router.push({name:'station',params:{id:1}})
        // this.$router.push({path: '/station', query: {id: 1}})
      },
      //在新窗口打開頁面
      windowOpen() {
        let routeData = this.$router.resolve({
          path: './inputValidate',//跳轉的鏈接
          query: {
            name: 'chart',
          },//需要传递的参数
        });
        window.open(routeData.href, '_blank');
      },
      close(key){
        console.log(key);
      }
    }
  }
</script>


<style lang="less" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  @green: #458C67;
  .model {
    &-edit {
      &__title {
        font-size: 25px;
        color: @green;

        &--disabled {
          color: gray;
        }
      }
    }
  }

  /*@component-namespace model{*/
  /*@b edit{*/
  /*@e title{*/
  /*font-size: 30px;*/
  /*@m disabled {*/
  /*color: gray;*/
  /*}*/
  /*}*/

  /*}*/
  /*}*/
  .content{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
