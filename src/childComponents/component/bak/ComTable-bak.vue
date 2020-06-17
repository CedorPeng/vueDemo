<template>
  <Table :size="size" :columns="columns" :data="data" :stripe="stripe" :border="border">
  </Table>
</template>
<script>

  export default {
    name: 'com-table',
    data() {
      return {}
    },
    props: {
      size: {
        type: String,
        default: 'default',
        validator: function (val) {
          return !val || ['large', 'small', 'default'].includes(val)
        }
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        default: []
      },
      data: {
        type: Array,
        default: []
      }
    },
    methods: {},
    created() {

    }
  }
</script>
<style scoped lang='less'>

</style>