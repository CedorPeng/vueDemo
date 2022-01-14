<template>
  <div>
    <div class="station">
      <div v-for="(item,index) in stationOption" :key="index">
        <i :class="{'active':activeStation === index }" @click="active(index)"></i>
        <p @click="active(index)">{{item}}</p>
      </div>
    </div>
    <i class="el-icon-edit"></i>
    <myHierarchy :data="options" :defaultProps="defaultProps"></myHierarchy>
  </div>
</template>

<script>
  import myHierarchy from './myHierarchy/index'
  export default {
    name: "station",
    data() {
      return {
        stationOption: ['西直门', '大钟寺', '知春路', '五道口', '上地', '清河', '西二旗', '龙泽', '回龙观', '霍营', '立水桥', '北苑'],
        activeStation: 0,
        eventBusTransfer:1,
        options:[
          {
            label:'name1',
            value:'1',
            online:true,
            service:'one',
            number:999,
            content:'myService',
            children:[
              {
                label:'name1-1',
                value:'1-1',
                online:true,
                service:'one',
                number:999,
                content:'myService',
              },
              {
                label:'name1-2',
                value:'1-2',
                online:true,
                service:'one',
                number:999,
                content:'myService',
                children:[
                  {
                    label:'name1-2-1',
                    value:'1-2-1',
                    online:true,
                    service:'three',
                    number:999,
                    content:'myService',
                  },
                  {
                    label:'name1-2-2',
                    value:'1-2-2',
                    online:true,
                    service:'one',
                    number:999,
                    content:'myService',
                    children:[
                      {
                        label:'name1-2-2-1',
                        value:'1-2-2-1',
                        online:true,
                        service:'one',
                        number:999,
                        content:'myService',
                      },
                      {
                        label:'name1-2-2-2',
                        value:'1-2-2-2',
                        online:false,
                        service:'one',
                        number:999,
                        content:'myService',
                      },
                      {
                        label:'name1-2-2-3',
                        value:'1-2-2-3',
                        online:true,
                        service:'one',
                        number:999,
                        content:'myService',
                      },
                    ]
                  },
                  {
                    label:'name1-2-3',
                    value:'1-2-3',
                    online:false,
                    service:'three',
                    number:999,
                    content:'myService',
                  },
                ]
              },
              {
                label:'name1-3',
                value:'1-3',
                online:false,
                service:'two',
                number:999,
                content:'myService',
              },
            ]
          },
          // {
          //   label:'name2',
          //   value:'2',
          //   online:true,
          //   service:'one',
          //   number:999,
          //   content:'myService',
          // },
          // {
          //   label:'name3',
          //   value:'3',
          //   online:false,
          //   service:'one',
          //   number:999,
          //   content:'myService',
          // },
          // {
          //   label:'name4',
          //   value:'4',
          //   online:true,
          //   service:'three',
          //   number:999,
          //   content:'myService',
          // },
          // {
          //   label:'name5',
          //   value:'5',
          //   online:false,
          //   service:'two',
          //   number:999,
          //   content:'myService',
          // },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          value:'id'
        }
      }
    },
    components:{
      myHierarchy
    },
    created() {
    },
    mounted() {
      this.eventBus.$on('transfer',name=>{
        // console.log(name);
        this.eventBusTransfer = name
      })
    },
    methods: {
      active(i) {
        if (this.activeStation === i) return
        this.activeStation = i
        // console.log(this.eventBusTransfer);
      },
      // useTransfer(key){
      //   this.eventBusTransfer = key
      // }
    }
  }
</script>

<style lang="less" scoped>
  .station {
    width: 400px;
    display: flex;
    height: 200px;

    > div {
      flex: 1;
      height: 20px;
      /*display: inline-block;*/
      list-style: none;
      position: relative;
      border-top: 1px solid #000;

      i {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: skyblue;
        position: absolute;
        cursor: pointer;
        top: -5px;
        left: -5px;

        &:hover {
          width: 14px;
          height: 14px;
          border-radius: 14px;
          background-color: skyblue;
          top: -7px;
          left: -7px;
        }

        &.active {
          background-color: red;
        }
      }

      p {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 100%;
        white-space: nowrap;
        transform: rotate(-45deg);
        transform-origin: top right;
      }

      &:last-child {
        border: none;
      }
    }
  }
</style>
