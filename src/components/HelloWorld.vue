<template>
  <div class="hello">
    <router-link to="/home">Go Home</router-link>
    <br>
    <Button type="default" @click="transmit" >传递值</Button>
    <div class="model-edit__title" >
      <span>能变大吗?</span>
      <span class="model-edit__title--disabled">过时</span>
    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'//方法一:引入vuex的mapActions方法
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{

  },
  mounted(){
  },
  methods:{
    // ...mapActions(['clickParams']),//方法一:注册clickParams方法
    transmit(){
      // this.clickParams({//方法一:使用clickParams传递数据
      //   value:'newTransmit'
      // })

      /***
       * @用vuex传值的方法二 : 传递值
       * @直接使用$store.dispatch
       * @语法 : this.$store.dispatch('传递值的actions方法',需要传递的值)
       */
      this.$store.dispatch('clickParams',{id:4,name:'Cedor'})
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
