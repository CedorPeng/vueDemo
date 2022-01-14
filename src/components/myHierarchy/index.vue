<template>
  <div class="hierarchyBox">
    <hierarchyItem class="hierarchy" :style="{width : 300 + 74 * (level - 1) + 'px'}" :options="options" @domClick="childrenTranslate"></hierarchyItem>
  </div>
</template>

<script>
  import hierarchyItem from "./hierarchyItem";
  export default {
    name: "index",
    components:{hierarchyItem},
    data(){
      return {
        options:[],
        level:1,
      }
    },
    props:{
      data:{
        type:Array
      },
      defaultProps:{
        type:Object
      }
    },
    methods:{
      childrenTranslate(data){
        console.log(data,'可以使用的');
      },
      resetData(){
        this.options = this.setLevel(this.data, 1);
      },
      setLevel(array){
        let newArray = array.map(item=>{
          item.level = this.level
          if(item.children && item.children.length !== 0){
            this.level += 1
            this.setLevel(item.children)
          }
          return item
        })
        return newArray
      }
    },
    mounted() {
      this.resetData()
    }
  }
</script>

<style lang="less" scoped>
.hierarchyBox{
  width: 100%;
  overflow: scroll;
  .hierarchy{
    margin: 0 auto;
  }
}
</style>
