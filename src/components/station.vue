<template>
  <div>
    <div class="station">
      <div v-for="(item,index) in stationOption" :key="index">
        <i :class="{'active':activeStation === index }" @click="active(index)"></i>
        <p @click="active(index)">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "station",
    data() {
      return {
        stationOption: ['西直门', '大钟寺', '知春路', '五道口', '上地', '清河', '西二旗', '龙泽', '回龙观', '霍营', '立水桥', '北苑'],
        activeStation: 0,
      }
    },
    created() {
    },
    mounted() {
      console.log(this.$route);
    },
    methods: {
      active(i) {
        if (this.activeStation === i) return
        this.activeStation = i

      }
    }
  }
</script>

<style lang="less" scoped>
  .station {
    width: 400px;
    display: flex;

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