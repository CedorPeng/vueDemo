<template>
  <FormItem :label="label" :class="formItemClassName">
    <Col :span="_lColSpan">
      <DatePicker
        :type="_lType"
        :editable="_lEditable"
        :placeholder="_lPlaceHolder"
        :value="startDate"
        :format="format"
        :placement="placement"
        :split-panels="splitPanels"
        :multiple="multiple"
        :show-week-numbers="showWeekNumbers"
        :start-date="startDateConfig"
        :confirm="confirm"
        :open="open"
        :size="size"
        :disabled="disabled"
        :clearable="clearable"
        :readonly="readonly"
        :transfer="transfer"
        :element-id="elementId"
        :time-picker-options="timePickerOptions"
        @on-change="startDateChanged"
        @on-open-change="startDateOpenChanged"
        @on-ok="startDateOk"
        @on-clear="startDateClear"
        :options="startDateOptions"
        :class="{startDatePickerClassName:true,datepickerAlone:!hasEndDate}"
      >
      </DatePicker>
    </Col>
    <template v-if="hasEndDate">
      <Col :span="_mColSpan" class="text_c">
        <DatePicker type="date" placeholder="">-</DatePicker>
      </Col>
      <Col :span="_rColSpan">
        <DatePicker
          :type="_rType"
          :editable="_rEditable"
          :placeholder="_rPlaceHolder"
          :value="endDate"
          :format="format"
          :placement="placement"
          :split-panels="splitPanels"
          :multiple="multiple"
          :show-week-numbers="showWeekNumbers"
          :start-date="startDateConfig"
          :confirm="confirm"
          :open="open"
          :size="size"
          :disabled="disabled"
          :clearable="clearable"
          :readonly="readonly"
          :transfer="transfer"
          :element-id="elementId"
          :time-picker-options="timePickerOptions"
          @on-change="endDateChanged"
          @on-open-change="endDateOpenChanged"
          @on-ok="endDateOk"
          @on-clear="endDateClear"
          :options="endDateOptions"
          :class="endDatePickerClassName"
        >
        </DatePicker>
      </Col>
    </template>
  </FormItem>
</template>

<script>
  export default {
    name: 'form-item-datepicker',
    data() {
      return {}
    },
    props: {
      prop: String,
      label: {
        type: String,
        default: '日期描述信息'
      },
      dateEditable: [Boolean, Array],
      datePlaceHolder: [String, Array],
      value: [Date, String],
      startDate: [Date, String],
      endDate: [Date, String],
      startDateOptions: Object,
      endDateOptions: Object,
      eventOpts: Object,
      hasEndDate: {
        type: Boolean,
        default: false
      },
      formItemClassName: Array,
      startDatePickerClassName: Array,
      endDatePickerClassName: Array,
      dateType: [String, Array],
      colspan: [String, Array],
      format: Date,
      placement: {
        type: String,
        default: 'bottom-start',
        validator: function (val) {
          return ['top', 'bottom', 'top-start', 'bottom-start',
            'top-end', 'bottom-end', 'left', 'left-start',
            'left-end', 'right', 'right-start', 'right-end'].includes(val)
        }
      },
      splitPanels: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      showWeekNumbers: {
        type: Boolean,
        default: false
      },
      startDateConfig: Date,
      confirm: {
        type: Boolean,
        default: false
      },
      open: {
        type: Boolean,
        default: null
      },
      size: {
        type: String,
        validator: function (val) {
          return !val || ['large', 'small', 'default'].includes(val)
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      transfer: {
        type: Boolean,
        default: false
      },
      elementId: String,
      timePickerOptions: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    watch: {
      colspan: {
        immediate: true,
        handler(newVal) {
          this.colSpanHandler(newVal)
        }
      }
    },
    methods: {
      startDateChanged(val) {
        this.eventOpts && this.eventOpts.startDateChanged && this.eventOpts.startDateChanged(val);
        this.$emit('update:startDate', val);
      },
      startDateOpenChanged(val) {
        this.eventOpts && this.eventOpts.startDateOpenChanged && this.eventOpts.startDateOpenChanged(val);
      },
      startDateOk(val) {
        this.eventOpts && this.eventOpts.startDateOk && this.eventOpts.startDateOk(val);
      },
      startDateClear(val) {
        this.eventOpts && this.eventOpts.startDateClear && this.eventOpts.startDateClear(val);
      },

      endDateChanged(val) {
        this.eventOpts && this.eventOpts.endDateChanged && this.eventOpts.endDateChanged(val);
        this.$emit('update:endDate', val);
      },
      endDateOpenChanged(val) {
        this.eventOpts && this.eventOpts.endDateOpenChanged && this.eventOpts.endDateOpenChanged(val);
      },
      endDateOk(val) {
        this.eventOpts && this.eventOpts.endDateOk && this.eventOpts.endDateOk(val);
      },
      endDateClear(val) {
        this.eventOpts && this.eventOpts.endDateClear && this.eventOpts.endDateClear(val);
      },


      colSpanHandler(val) {
        if (!val) { // colspan默认值逻辑(封装的组件没有传参的情况)
          if (this.hasEndDate) {
            [this._lColSpan, this._mColSpan, this._rColSpan] = ['11', '2', '11']
          } else {
            this._lColSpan = '24'
          }
        } else if (val.constructor === String) {
          this._lColSpan = val
        } else if (val.constructor === Array) {
          this.colSpanSwitch(val, val.length)
        } else {
          this._lColSpan = '24'
        }
      },
      colSpanSwitch(val, num) {
        switch (num) {
          case 1:
            [this._lColSpan] = val
            break
          case 2:
            [this._lColSpan, this._rColSpan] = val
            break
          case 3:
            [this._lColSpan, this._mColSpan, this._rColSpan] = val
            break
          default:
            [this._lColSpan] = val
        }
      },
      analysePlaceHolder(placeholder) {
        if (!placeholder) { // placeholder默认值逻辑(封装的组件没有传参的情况)
          if (this.hasEndDate) {
            [this._lPlaceHolder, this._rPlaceHolder] = ['选择开始日期', '选择结束日期']
          } else {
            [this._lPlaceHolder, this._rPlaceHolder] = ['请选择日期', '']
          }
        } else if (placeholder.constructor === String) {
          this._lPlaceHolder = placeholder
        } else if (placeholder.constructor === Array) {
          placeholder.length === 1 && ([this._lPlaceHolder] = placeholder)
          placeholder.length === 2 && ([this._lPlaceHolder, this._rPlaceHolder] = placeholder)
        } else {
          [this._lPlaceHolder, this._rPlaceHolder] = ['请选择日期', '']
        }
      },
      analyseType(type) {
        if (!type) { // type默认值逻辑(封装的组件没有传参的情况)
          if (this.hasEndDate) {
            [this._lType, this._rType] = ['date', 'date']
          } else {
            [this._lType, this._rType] = ['date', '']
          }
        } else if (type.constructor === String) {
          this._lType = type
        } else if (type.constructor === Array) {
          type.length === 1 && ([this._lType] = type)
          type.length === 2 && ([this._lType, this._rType] = type)
        } else {
          [this._lType, this._rType] = ['date', '']
        }
      },
      analyseEditable(editable) {
        if (!editable) { // editable默认值逻辑(封装的组件没有传参的情况)
          if (this.hasEndDate) {
            [this._lEditable, this._rEditable] = [false, false]
          } else {
            [this._lEditable, this._rEditable] = [false, false]
          }
        } else if (editable.constructor === Boolean) {
          this._lEditable = editable
        } else if (editable.constructor === Array) {
          editable.length === 1 && ([this._lEditable] = editable)
          editable.length === 2 && ([this._lEditable, this._rEditable] = editable)
        } else {
          [this._lEditable, this._rEditable] = [false, false]
        }
      }
    },
    created() {
      this.colSpanHandler(this.colspan)
      this.analysePlaceHolder(this.datePlaceHolder) //datePlaceHolder属性逻辑处理
      this.analyseType(this.dateType) //dateType属性逻辑处理
      this.analyseEditable(this.dateEditable) //dateEditable属性逻辑处理
    }
  }
</script>
<style scoped lang='less'>
  .datepickerAlone {
    width: 100%;
  }
</style>

