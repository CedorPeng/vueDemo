<template>
  <div>
    <div v-for="(item,index) in options" :class="{'line' : item.level !== 1 && index < options.length - 1}" :key="index">
      <div class="treeItem" :class="{ 'leftLine' :  item.level !== 1}" @click="translate(item)">
        <div class="left">
          <Icon size="40" :style="{color: item.service === 'three' ? '' : '#409eff'}" :type="icon[item.service]"/>
          <div><span class="serviceType" :style="{background:serviceColor[item.service]}"></span>{{serviceType[item.service]}}</div>
        </div>
        <div class="right">
          <div class="currentId">{{item.label}}</div>
          <div>{{item.number}}</div>
          <div>{{item.content}}</div>
        </div>
      </div>
      <div class="itemChild" v-show="item.children && item.children.length !== 0">
        <hierarchyItem :options="item.children" @domClick="childrenTranslate"></hierarchyItem>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hierarchyItem",
    data(){
      return {
        icon:{
          one:'md-radio-button-on',
          two:'md-radio-button-off',
          three:'ios-radio-button-on',
        },
        serviceType:{
          one:'online',
          two:'offline',
          three:'No Service',
        },
        serviceColor:{
          one:'#48e600',
          two:'#ed4014',
          three:'#5c6b77',
        },
      }
    },
    props:{
      options:Array,
      last:{
        type:Boolean,
        default:false,
      },
    },
    methods:{
      translate(data){
        this.$emit('domClick',data)
      },
      childrenTranslate(data){
        this.translate(data)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .line{
    position: relative;
    &:after{
      width: 2px;
      height: 100% ;
      content: '';
      background-color: #409eff;
      position: absolute;
      top: 35px;
      left: -31px;

    }
  }
  .treeItem{
    padding: 8px 0;
    border:1px solid #ccc;
    display: flex;
    width: 298px;
    height: 88px;
    background-color: #fff;
    box-shadow: darkgrey 0 1px 8px 0;
    border-radius: 4px;
    margin: 20px 0;
    position: relative;
    .left{
      width: 90px;
      text-align: center;
      padding: 4px 0;
      .serviceType{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        margin-right: 6px;
      }

    }
    .right{
      flex: 1;
      .currentId{
        font-size: 16px;
        font-weight: 700;
      }
    }
    &.leftLine{
      &:after{
        content: '';
        width: 32px;
        height: 2px;
        background-color: #409eff;
        position: absolute;
        top: 44px;
        left: -32px;
      }
      &:before{
        content: '';
        width: 2px;
        height: 90px;
        background-color: #409eff;
        position: absolute;
        bottom: 42px;
        left: -32px;
        z-index: -1;
      }
    }
  }
  .itemChild{
    padding-left: 74px;
  }
</style>
