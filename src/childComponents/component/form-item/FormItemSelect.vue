

<template>
    <FormItem :label="label" :prop="prop">
        <Select  
            ref="selectRef"
            :value="value"
            :class="selectClassName"
            :placeholder="placeholder"
            :filterable="filterable"
            :label-in-value="labelInValue"
            :label="selectLabel"
            :multiple="multiple"
            :remote="remote"  
            :clearable="clearable" 
            :remote-method="remoteMethod"
            :disabled="disabled"
            :loading="loading"
            :loading-text="loadingText"
            :size="size"
            :not-found-text="notFoundText"
            :placement="placement"
            :transfer="transfer"
            :element-id="elementId"
            @on-change="onChange"
            @on-query-change="onQueryChange"
            @on-clear="onClear"
            @on-open-change="onOpenChange"
            >
            <Option
                :value="item[optionOpts.key]"
                v-for="item in optionList"
                :disabled="item.disabled || false"
                :key="item.id">{{item[optionOpts.label]}}</Option>
        </Select>
    </FormItem>
</template>

<script>
export default {
    name:'form-item-select',
    data() {
        return {
            
        }
    },
    props: {
        prop: String,
        label: {
            type: String,
            default: '描述信息'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        labelInValue: {
            type: Boolean,
            default: false
        },
        value: [String,Number,Array],
        multiple: {
            type: Boolean,
            default: false
        },
        remote: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        selectClassName: String,
        eventOpts: Object,
        optionList: Array,
        optionOpts: Object,
        remoteMethod: Function,
        disabled: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: '加载中'
        },
        selectLabel: [String,Number,Array],
        size: {
            type: String,
            validator: function(val) {
                return !val || ['large','small','default'].includes(val)
            }
        },
        notFoundText: {
            type: String,
            default: '无匹配数据'
        },
        placement: {
            type: String,
            default: 'bottom-start',
            validator: function(val) {
                return ['top','bottom','top-start','bottom-start','top-end','bottom-end'].includes(val)
            }
        },
        transfer: {
            type: Boolean,
            default: false
        },
        elementId: String
    },
    watch: {
    
    },
    methods: {
      onChange: function(val) {
          if(val && val.constructor === Object) { //labelInValue属性为true,此时的val返回对象{label'xx',value:'xx}
              this.$emit('input',val.value)
          }else {
              this.$emit('input',val)
          }
          this.eventOpts.onChange && this.eventOpts.onChange(val);
      },
      onQueryChange: function(val) {
          this.eventOpts.onQueryChange && this.eventOpts.onQueryChange(val);
      },
      onClear: function(val) {
          this.eventOpts.onClear && this.eventOpts.onClear(val);
      },
      onOpenChange: function(val) {
          this.eventOpts.onOpenChange && this.eventOpts.onOpenChange(val,this.$refs.selectRef);
      }
    },
    created() {
    }
}
</script>
<style  scoped lang='less'>

</style>