<template>
  <Dropdown placement="right-start">
    <a href="javascript:;" v-if="!isChild">
      <Icon :type="subMenu.lcon" v-if="subMenu.lcon"/>
      <span v-if="isChild">{{subMenu.label || subMenu[menuConfig.label]}}</span>
    </a>
    <DropdownItem v-show="subMenu[menuConfig.visible]==1" v-else>
      {{subMenu.label || subMenu[menuConfig.label]}}
    </DropdownItem>
    <DropdownMenu slot="list" :class="{dropdown:!isChild}">
      <template v-for="(menu,menuIndex) in subMenu[menuConfig.child]">
        <DropdownItem
          v-if="!menu[menuConfig.child] || menu[menuConfig.child].length==0"
          v-show="menu[menuConfig.visible]==1"
          :name="menu.name || menu[menuConfig.name]"
          @click.native="menu.clickCallback(menu[menuConfig.url],menu) || function(){}">
          {{menu.label || menu[menuConfig.label]}}
        </DropdownItem>
        <com-submenu-collapsed :menuConfig="menuConfig" :subMenu="menu" :isChild="true" v-else/>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>

  export default {
    name: 'com-submenu-collapsed',
    data() {
      return {}
    },
    props: {
      isChild: {
        type: Boolean,
        default: false
      },
      subMenu: Object,
      menuConfig: Object
    },
    methods: {},
    created() {

    }
  }
</script>
<style scoped lang='less'>
  .dropdown {
    position: absolute;
    left: 0.35rem;
    top: -0.4rem;
    background: white;
    z-index: 100;
  }
</style>