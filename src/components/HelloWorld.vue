<template>
  <div class="hello">
    <router-link to="/home">Go Home</router-link>
    <br>
    <Button type="default" @click="transmit" >传递值</Button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'//引入vuex的mapActions方法
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
    ...mapActions(['clickParams']),//注册clickParams方法
    transmit(){
      this.clickParams({//使用clickParams传递数据
        value:'newTransmit'
      })
    }
  }
}
</script>


<style scoped>
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
</style>
