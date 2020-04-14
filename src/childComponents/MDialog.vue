<template>
    <div class="my--dialog" v-if="value">
      <div class="my--dialog__main" :style="{'margin-top':top + 'px',width:width,height:height}">
        <div class="my--dialog__main_header">
          <h2>{{title}}</h2>
          <Icon type="md-close" class="my--dialog__close" @click="myClose" v-if="close" />
        </div>
        <slot></slot>
        <div class="my--dialog__main_footer" v-if="footer">
          <Button @click="myClose">cancel</Button>
          <Button type="primary">Primary</Button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "MDialog",
    data(){
      return {

      }
    },
    methods:{
      myClose(){
        this.$emit('input',false)
      }
    },
    props:{
      title:{
        type:String,
        default:''
      },
      top:{
        type:String,
        default: 100
      },
      width:{
        type:String,
        default: '50%'
      },
      height:{
        type:String,
        default: '400px'
      },
      value:{
        type:Boolean,
        default:false
      },
      close:{
        type:Boolean,
        default:true
      },
      footer:{
        type:Boolean,
        default:false
      },
    }
  }
</script>

<style lang="less" scoped>
.my--dialog{
  position: fixed;
  background: rgba(0,0,0,.6);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  &__close{
    font-size: 20px;
    position: absolute;
    top: 15px;
    right:20px;
    cursor: pointer;
  }
  &__main{
    margin: 0 auto;
    padding: 0 20px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    &_header{
      height: 50px;
      line-height: 50px;
    }
    &_footer{
      height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 10px;
      text-align: right;
      padding: 0 20px;
    }
  }
}
</style>
