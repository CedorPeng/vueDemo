<template>
  <FormItem :label="label" :prop="prop">
    <!-- v-on="eventOpts" 更抽象的事件实现方式-->
    <Input
      :value="value"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :type="type"
      :size="size"
      :clearable="clearable"
      :disabled="disabled"
      :readonly="readonly"
      :icon="icon"
      :prefix="prefix"
      :suffix="suffix"
      :search="search"
      :enter-button="enterButton"
      :rows="rows"
      :autosize="autosize"
      :number="number"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :element-id="elementId"
      :spellcheck="spellcheck"
      :wrap="wrap"
      @on-enter="onEnter"
      @on-click="onClick"
      @on-change="onChange"
      @on-focus="onFocus"
      @on-blur="onBlur"
      @on-keyup="onKeyUp"
      @on-keydown="onKeyDown"
      @on-keypress="onKeyPress"
      @on-search="onSearch"
    >
    </Input>
  </FormItem>
</template>

<script>
  export default {
    name: 'form-item-input',
    data() {
      return {}
    },
    props: {
      prop: String,
      label: {
        type: String,
        default: '描述信息'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      value: [String, Number],
      maxlength: {
        type: Number,
        default: 50
      },
      eventOpts: Object,
      type: {
        type: String,
        default: 'text'
      },
      size: {
        type: String,
        validator: function (val) {
          return !val || ['large', 'small', 'default'].includes(val)
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      icon: String,
      prefix: String,
      suffix: String,
      search: {
        type: Boolean,
        default: false
      },
      enterButton: {
        type: [Boolean, String],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      number: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off',
        validator: function (val) {
          return ['off', 'on'].includes(val)
        }
      },
      elementId: String,
      spellcheck: {
        type: Boolean,
        default: false
      },
      wrap: {
        type: String,
        default: 'soft',
        validator: function (val) {
          return ['hard', 'soft'].includes(val)
        }
      }

    },
    watch: {},
    methods: {
      onEnter(val) {
        this.eventOpts && this.eventOpts.onEnter && this.eventOpts.onEnter(val);
      },
      onClick(val) {
        this.eventOpts && this.eventOpts.onClick && this.eventOpts.onClick(val);
      },
      onChange(val) {
        this.$emit('input', val.target.value)
        this.eventOpts && this.eventOpts.onChange && this.eventOpts.onChange(val);
      },
      onFocus(val) {
        this.eventOpts && this.eventOpts.onFocus && this.eventOpts.onFocus(val);
      },
      onBlur(val) {
        this.eventOpts && this.eventOpts.onBlur && this.eventOpts.onBlur(val);
      },
      onKeyUp(val) {
        this.eventOpts && this.eventOpts.onKeyUp && this.eventOpts.onKeyUp(val);
      },
      onKeyDown(val) {
        this.eventOpts && this.eventOpts.onKeyDown && this.eventOpts.onKeyDown(val);
      },
      onKeyPress(val) {
        this.eventOpts && this.eventOpts.onKeyPress && this.eventOpts.onKeyPress(val);
      },
      onSearch(val) {
        this.eventOpts && this.eventOpts.onSearch && this.eventOpts.onSearch(val);
      }
    },
    created() {
    }
  }
</script>
<style scoped lang='less'>

</style>