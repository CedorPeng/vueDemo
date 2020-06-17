<template>
  <Menu
    :theme="theme"
    :width="width"
    :active-name="activeName"
    :open-names="openNames"
    :accordion="accordion"
    :mode="mode"
    @on-select="onSelect"
    @on-open-change="onOpenChange"
    class="menu-item">
    <com-submenu :menuConfig="menuConfig" :subMenu="subMenu" v-for="(subMenu,index) in subMenus" :key="index"/>
  </Menu>
</template>
<script>
  import ComSubmenu from './ComSubmenu.vue'

  export default {
    name: 'com-menu',
    data() {
      return {}
    },
    components: {
      ComSubmenu
    },
    props: {
      theme: {
        type: String,
        default: 'light',
        validator: function (val) {
          return !val || ['light', 'dark', 'primary'].includes(val)
        }
      },
      activeName: String,
      openNames: {
        type: Array,
        default: function () {
          return []
        }
      },
      accordion: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'vertical',
        validator: function (val) {
          return !val || ['horizontal', 'vertical'].includes(val)
        }
      },
      width: {
        type: String,
        default: '240px'
      },
      subMenus: Array,
      menuConfig: Object,
      eventOpts: Object
    },
    methods: {
      onSelect(val) {
        this.eventOpts && this.eventOpts.onSelect && this.eventOpts.onSelect(val);
      },
      onOpenChange(val) {
        this.eventOpts && this.eventOpts.onOpenChange && this.eventOpts.onOpenChange(val);
      }
    },
    created() {

    }
  }
</script>
<style scoped lang='less'>

</style>