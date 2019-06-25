<template>
    <div>
      <draggable v-model="list">
        <div v-for="(item,index) in list">
          {{item.name}}
          <draggable v-model="item.childList">
            <div v-for="childItem in item.childList">{{childItem.childName}}</div>
          </draggable>
        </div>
      </draggable>
      {{list}}
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
    export default {
        name: "Draggable",
      components: {
        //调用组件
        draggable,
      },
      data(){
          return {
            list:[
              {
                id:1,
                name:'this1',
                childList:[
                  {
                    childId:1,
                    childName:'childName1-1'
                  },
                  {
                    childId:2,
                    childName:'childName1-2'
                  },
                  {
                    childId:3,
                    childName:'childName1-3'
                  },
                ]
              },
              {
                id:2,
                name:'this2',
                childList:[
                  {
                    childId:1,
                    childName:'childName2-1'
                  },
                  {
                    childId:2,
                    childName:'childName2-2'
                  },
                  {
                    childId:3,
                    childName:'childName2-3'
                  },
                ]
              },
              {
                id:3,
                name:'this3',
                childList:[
                  {
                    childId:1,
                    childName:'childName3-1'
                  },
                  {
                    childId:2,
                    childName:'childName3-2'
                  },
                  {
                    childId:3,
                    childName:'childName3-3'
                  },
                ]
              },
              {
                id:4,
                name:'this4',
                childList:[
                  {
                    childId:1,
                    childName:'childName4-1'
                  },
                  {
                    childId:2,
                    childName:'childName4-2'
                  },
                  {
                    childId:3,
                    childName:'childName4-3'
                  },
                ]
              },
            ]
          }
      }
    }
</script>

<style scoped>

</style>
