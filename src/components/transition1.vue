<template>
  <div class="transition1">
    <Button type="default" @click="show=!show">动起来</Button>
    <transition name="my">
      <div class="box" v-show="show">
        <p>
          这里是内容，会不会影响
        </p>
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    name: "transition1",
    data() {
      return {
        show: true
      }
    },
    methods: {},

  }
</script>

<style lang="less" scoped>
  .box {
    width: 100px;
    height: 100px;
    background-color: black;
    overflow: hidden;
    color: #fff;
  }

  .v-enter, .v-leave-to {
    opacity: 0;
    height: 0px;
  }

  .v-enter-active, v-leave-active {
    transition: all 1s linear;
  }

  .my-enter, .my-leave-to {
    opacity: 0;
    height: 0px;
  }

  .my-enter-active, my-leave-active {
    transition: all 0.3s linear;
  }

</style>