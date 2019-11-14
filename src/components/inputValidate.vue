<template>
    <div class="tpl">
        <Button type="default" @click="isTrue=true">编辑</Button>
        <Modal
                v-model="isTrue"
                title="个人信息"
                width="500px"
                @on-cancel="cancelSubmit"
        >
            <div>

                <Form
                        label-position="top"
                        :rules="myMessageValidate"
                        ref="myMessage"
                        :model="myMessage"
                >
                    <Row :gutter="24">
                        <Col>
                            <FormItem label="姓名" prop="name">
                                <Input v-model.trim="myMessage.name" placeholder="请输入"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="submit()">提交</Button>
                <Button type="default" @click="cancelSubmit">取消</Button>
            </div>

        </Modal>
    </div>
</template>

<script>
    export default {
        name: "inputValidate",
        data() {
            return {
                isTrue: false,
                myMessage: {
                    name: ''
                },
                myMessageValidate: {
                    name: [{
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('提示信息'))
                            } else {
                                callback()
                            }
                        },
                        required: true,
                        trigger: 'blur'//select需要使用change事件触发
                    }]
                }
            }
        },
        methods: {
            submit() {
                this.$refs.myMessage.validate(valid => {
                    if (valid) {
                        console.log(111);
                    }
                })
            },
            cancelSubmit() {
                this.isTrue = false;
                this.$refs.myMessage.resetFields()

            }
        }
    }
</script>

<style scoped>

</style>
