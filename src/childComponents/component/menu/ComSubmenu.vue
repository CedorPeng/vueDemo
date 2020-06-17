<template>
  <Submenu :name="subMenu.name || subMenu[menuConfig.name]" v-show="subMenu[menuConfig.visible]==1">
    <template slot="title">
      <Icon :type="subMenu.lcon" v-if="subMenu.lcon"></Icon>
      <span class="menu-label">{{subMenu.label || subMenu[menuConfig.label]}}</span>
    </template>
    <template v-for="(menu,menuIndex) in subMenu[menuConfig.child]">
      <menu-item
        v-if="!menu[menuConfig.child] || menu[menuConfig.child].length==0"
        v-show="menu[menuConfig.visible]==1"
        :name="menu.name || menu[menuConfig.name]"
        :to="menu.url"
        :replace="menu.replace"
        :target="menu.target"
        @click.native="menu.clickCallback(menu[menuConfig.url],menu) || function(){}">
        <span class="menu-label"> {{menu.label || menu[menuConfig.label]}} </span>
      </menu-item>
      <com-submenu :menuConfig="menuConfig" :subMenu="menu" v-else/>
    </template>
  </Submenu>
</template>
<script>

  export default {
    name: 'com-submenu',
    data() {
      return {}
    },
    props: {
      subMenu: Object,
      menuConfig: Object
    },
    methods: {},
    created() {

    }
  }
</script>
<style scoped lang='less'>
  // 临时不用，之后通用组件放开
  .menu-label {
    width: 70% !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
  }
</style>