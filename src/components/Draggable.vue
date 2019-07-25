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
            currentList:[],
            list:[
              {
                id:3,
                name:'this3',
                childList:[
                  {
                    id:1,
                    childName:'childName3-1'
                  },
                  {
                    id:2,
                    childName:'childName3-2'
                  },
                  {
                    id:3,
                    childName:'childName3-3'
                  },
                ]
              },
              {
                id:1,
                name:'this1',
                childList:[
                  {
                    id:1,
                    childName:'childName1-1'
                  },
                  {
                    id:2,
                    childName:'childName1-2'
                  },
                  {
                    id:3,
                    childName:'childName1-3'
                  },
                ]
              },
              {
                id:2,
                name:'this2',
                childList:[
                  {
                    id:1,
                    childName:'childName2-1'
                  },
                  {
                    id:2,
                    childName:'childName2-2'
                  },
                  {
                    id:3,
                    childName:'childName2-3'
                  },
                ]
              },
              {
                id:4,
                name:'this4',
                childList:[
                  {
                    id:1,
                    childName:'childName4-1'
                  },
                  {
                    id:2,
                    childName:'childName4-2'
                  },
                  {
                    id:3,
                    childName:'childName4-3'
                  },
                ]
              },
            ],
            orderList:[
              {
                id:3,
                childOrder:[
                  {
                    id:2
                  },
                  {
                    id:3
                  },
                  {
                    id:1
                  },
                ],
              },
              {
                id:1,
                childOrder:[
                  {
                    id:1
                  },
                  {
                    id:3
                  },
                  {
                    id:2
                  },
                ],
              },
              {
                id:4,
                childOrder:[
                  {
                    id:2
                  },
                  {
                    id:1
                  },
                  {
                    id:3
                  },
                ],
              },
              {
                id:2,
                childOrder:[
                  {
                    id:3
                  },
                  {
                    id:2
                  },
                  {
                    id:1
                  },
                ],
              },
            ]
          }
      },
      mounted() {
        this.changeIndex()
      },
      methods:{
          changeIndex(){
            this.list = this.resetArray(this.list,this.orderList)
            this.list.forEach((item,index)=>{
              item.childList = this.resetArray(item.childList, this.orderList[index].childOrder);
            })
          },
        resetArray(oldArray,orderList){
            let newArray = []
            for (var i = 0; i < orderList.length; i++) {
              let currentObj = {}
              for (var j = 0; j < oldArray.length; j++) {
                if( orderList[i].id === oldArray[j].id ){
                  currentObj = oldArray[j]
                }
              }
              newArray[i] = currentObj
            }
            return newArray
        }
      }
    }
</script>

<style scoped>

</style>
