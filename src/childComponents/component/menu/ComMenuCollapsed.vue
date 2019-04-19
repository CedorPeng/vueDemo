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
        class="menu-item collapsed-menu">
        <MenuItem :name="subMenu.name || subMenu[menuConfig.name]" v-for="(subMenu,index) in subMenus" :key="index" v-show="subMenu[menuConfig.visible]==1">
            <com-submenu-collapsed :menuConfig="menuConfig" :subMenu="subMenu"/>
        </MenuItem>
    </Menu>
</template>
<script>
  import ComSubmenuCollapsed from './ComSubmenuCollapsed.vue'
  export default {
    name:'com-menu',
    data() {
        return {
            
        }
    },
    components: {
        ComSubmenuCollapsed
    },
    props: {
        theme: {
            type: String,
            default: 'light',
            validator: function(val) {
                return !val || ['light','dark','primary'].includes(val)
            }
        },
        activeName: String,
        openNames: {
            type: Array,
            default: function() {
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
            validator: function(val) {
                return !val || ['horizontal','vertical'].includes(val)
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
<style  scoped lang='less'>
    
</style>