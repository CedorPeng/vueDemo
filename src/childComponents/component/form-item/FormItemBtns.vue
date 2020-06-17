<template>
  <FormItem :style="formItemStyle">
    <template v-for="(btn,index) in btnsOption">
      <Button :key="index" :type="btn.type" @click="btn.clickCallback" class="form-item__btn">{{btn.label}}
      </Button>
    </template>
  </FormItem>
</template>

<script>
  export default {
    name: 'form-item-btns',
    data() {
      return {}
    },
    props: {
      formItemStyle: String,
      btnsOption: Array
    },
    methods: {}
  }
</script>
<style scoped lang='less'>
  .form-item__btn {
    margin-left: 4px;
  }
</style>