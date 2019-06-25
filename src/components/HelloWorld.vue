<template>
  <div class="hello">
    <router-link to="/home">Home</router-link>
    <router-link to="/news">News</router-link>
    <router-link to="/draggable">draggable</router-link>
    <br>
    <Button type="default" @click="transmit" >导出sheet</Button>
    <Button type="default" @click="save" >转PDF并导出</Button>
    <div class="model-edit__title" >
      <span>能变大吗?</span>
      <span class="model-edit__title--disabled">过时</span>
    </div>
    <div class="content" style="width: 1000px;margin:0 auto;">
      <router-view/>
    </div>
    <div v-show="false" id="pdfDom" style="padding-top: 55px;background-color:#fff;">

    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'//方法一:引入vuex的mapActions方法
import html2canvas from 'html2canvas';
import Canvas2PDF from 'Canvas2PDF'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:'testPDF',
      pageList:{}
    }
  },
  watch:{

  },
  mounted(){
  },
  created(){
    this.eventBus.$on('close',(name)=>{
      this.close(name)
    })
  },
  methods:{
    // ...mapActions(['clickParams']),//方法一:注册clickParams方法
    async transmit(){
      if(!this.pageList[this.$route.name]){
        let currentCanvas = await this.htmlToCanvas('.content');
        let imgUrl = currentCanvas.toDataURL('image/jpeg', 1.0)
        let img = document.createElement('img');
        img.src = imgUrl
        this.pageList[this.$route.name] = img;
      }
      // this.clickParams({//方法一:使用clickParams传递数据
      //   value:'newTransmit'
      // })

      /***
       * @用vuex传值的方法二 : 传递值
       * @直接使用$store.dispatch
       * @语法 : this.$store.dispatch('传递值的actions方法',需要传递的值)
       */
      // this.$store.dispatch('clickParams',{id:4,name:'Cedor'})
    },
    async save(){
      let canvas = this.mergeImg(this.pageList)
      this.savePdf(canvas,this.title)
    },
    close(name){
      console.log(name);
    },
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
@green : #458C67;
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
</style>
