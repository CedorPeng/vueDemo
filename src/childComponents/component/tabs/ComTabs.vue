<template>
    <Tabs
            :type="type"
            :closable="closable"
            :animated="animated"
            :value="value"
            :size="size"
            :capture-focus="captureFocus"
            :before-remove="beforeRemove"
            @on-click="onClick"
            @on-tab-remove="onTabRemove">
        <TabPane
                v-for="tab in tabList"
                :label="tab[tabConfig.label]"
                :name="tab[tabConfig.name]+''"
                :icon="paneIcon"
                :disabled="paneDisabled"
                :closable="paneClosable"
                :key="tab[tabConfig.id]">
        </TabPane>
    </Tabs>
</template>
<script>

    export default {
        name: 'com-tabs',
        data() {
            return {}
        },
        props: {
            type: {
                type: String,
                default: 'line',
                validator: function (val) {
                    return ['line', 'card'].includes(val)
                }
            },
            value: String,
            closable: {
                type: Boolean,
                default: false
            },
            animated: {
                type: Boolean,
                default: true
            },
            size: {
                type: String,
                default: 'default',
                validator: function (val) {
                    return ['default', 'small'].includes(val)
                }
            },
            captureFocus: {
                type: Boolean,
                default: false
            },
            beforeRemove: Function,
            eventOpts: Object,
            // paneName: String,
            // paneLabel: [String,Function],
            paneIcon: String,
            paneDisabled: {
                type: Boolean,
                default: false
            },
            paneClosable: {
                type: Boolean,
                default: null
            },
            tabList: Array,
            tabConfig: Object
        },
        methods: {
            onClick(val) {
                this.eventOpts && this.eventOpts.onClick && this.eventOpts.onClick(val);
            },
            onTabRemove(val) {
                this.eventOpts && this.eventOpts.onTabRemove && this.eventOpts.onTabRemove(val);
            }
        },
        created() {

        }
    }
</script>
<style scoped lang='less'>

</style>