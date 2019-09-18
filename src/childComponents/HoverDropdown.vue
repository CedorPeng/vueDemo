<template>
  <div class="HoverDropdown">
    <div class="self_dropDown" @mouseover="selfMouseOver" @mouseout="selfMouseOut">
      <div class="title">
<!--        <i class="iconfont icon-fanhui" :style="{color : '#459CFC'}"></i>-->
        <span>hoverDropdown</span>
      </div>
      <div v-if="show" class="dropdown_box">
        <div class="select_title">
<!--          <i class="iconfont icon-fanhui" :style="{color : '#459CFC'}"></i>-->
          <span>hoverDropdown</span>
        </div>
        <div>
          <div class="select_every">
            <span class="everyName">- fanhui</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "HoverDropdown",
    data(){
      return {
        show:false,
        clear:null,
      }
    },
    methods:{
      selfMouseOver(){
        // setTimeout(()=>{
        //   if(this.clear){
            this.show = true
        //   }
        // },300)
      },
      selfMouseOut(){
        // this.clear = false
        // setTimeout(()=>{
        //   if(this.clear){
            this.show = false
        //   }
        // },300)
      },
    }
  }
</script>

<style scoped lang="less">
  .HoverDropdown{
    display: inline-block;
    .self_dropDown{
      position: relative;
    }
    .title{
      padding:8px 18px;
      display: inline-block;
      font-family: Roboto-Bold;
      font-size: 14px;
      color: #666666;
    }
    .dropdown_box{
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      padding:8px 18px;
      background: #FFFFFF;
      border: 1px solid #D6E2F4;
      box-shadow: 0 2px 4px 0 rgba(32,32,78,0.20);
      border-radius: 6px;
      .select_title{
        font-family: Roboto-Bold;
        font-size: 14px;
        color: #666666;
      }
      .select_every{
        padding:3px 0 ;
        .everyName{
          font-family: Roboto-Regular;
          font-size: 14px;
          color: #578CE1;
        }
      }
    }
  }

</style>
