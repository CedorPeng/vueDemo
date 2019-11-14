<template>
    <Form :ref="refForm" :model="formVal" :rules="rules" :label-position="labelPosition">
        <Row :gutter="gutter" v-for="(formCols,rIndex) in formRows" :key="rIndex">
            <Col :span="24/formCols.length" v-for="(component,cIndex) in formCols" :key="cIndex">
                <component :is="component.name" v-bind="component.attr" v-model="formVal[component.attr.prop]"
                           v-if="['form-item-input','form-item-select'].includes(component.name)"></component>
                <component :is="component.name" v-bind="component.attr"
                           :startDate.sync="formVal[component.attr.startDateSync]"
                           :endDate.sync="formVal[component.attr.endDateSync]"
                           v-else-if="component.name==='form-item-datepicker'"></component>
                <component :is="component.name" v-bind="component.attr" v-else></component>
            </Col>
        </Row>
    </Form>
</template>
<script>
    import FormItemBtns from './FormItemBtns.vue'
    import FormItemDatepicker from './FormItemDatepicker.vue'
    import FormItemInput from './FormItemInput.vue'
    import FormItemSelect from './FormItemSelect.vue'

    export default {
        name: 'form-items',
        data() {
            return {}
        },
        components: {
            FormItemBtns,
            FormItemDatepicker,
            FormItemInput,
            FormItemSelect
        },
        props: {
            formRows: Array,
            gutter: {
                type: Number,
                default: 10
            },
            refForm: String,
            formVal: Object,
            rules: Object,
            labelPosition: {
                type: String,
                default: 'right'
            }

        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang='less'>

</style>