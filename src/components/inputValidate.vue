<template>
    <div class="tpl">
        <Button type="default" @click="isTrue=true">编辑</Button>
        <Modal
            v-model="isTrue"
            title="个人信息"
            width="500px"
            @on-cancel="cancelSubmit">
            <div>
                <Form
                    label-position="top"
                    :rules="myMessageValidate"
                    ref="myMessage"
                    :model="myMessage">
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
        <div class="chartBox" style="width: 1000px;">
<!--            <D3Line-->
<!--                class="line"-->
<!--                name="line"-->
<!--                :data="chart.chartData"-->
<!--                :settings="chart.chartSettings"-->
<!--            ></D3Line>-->
<!--            <D3Bar-->
<!--                class="bar"-->
<!--                name="bar"-->
<!--                :data="chart.chartData"-->
<!--                :settings="chart.chartSettings"-->
<!--            ></D3Bar>-->
            <PercentStackBar
                class="bar"
                name="bar"
                :data="chart.chartData"
                :settings="chart.chartSettings"
            ></PercentStackBar>
        </div>
    </div>
</template>

<script>
    import D3Line from '../childComponents/D3Line'
    import D3Bar from '../childComponents/D3Bar'
    import PercentStackBar from '../childComponents/PercentStackBar'
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
                },
                chart:{
                    // chartData:{
                    //     columns:['name','label','money','visit'],
                    //     rows:[
                    //         {name: 'Mon', label: 15,money:1234,visit:135},
                    //         {name: 'Tue', label: 52,money:5234,visit:235},
                    //         {name: 'Wed', label: 200,money:3234,visit:735},
                    //         {name: 'Thu', label: 235,money:4234,visit:435},
                    //         {name: 'Fri', label: 390,money:2234,visit:635},
                    //         {name: 'Sat', label: 330,money:7234,visit:535},
                    //         {name: 'Sun', label: 221,money:6234,visit:335}
                    //     ]
                    // },
                    // chartSettings:{
                    //     lineStyle : '4,2',//虚线属性'线的长度,留白的长度'
                    //     axisSite : { right : ['money','visit'] },
                    //     dataOrder : { label : 'money', order : 'asc' },
                    //     stack:{noMoney:['label','visit']}
                    // }
                    chartData : {
                        columns:['name','last','year1','year2','year3','year4','year5'],
                        rows:[
                            {
                                name : 'pengxc2',
                                last : 10000 ,
                                year1 : 16000,
                                year2: 8000,
                                year3 : 5000,
                                year4 : 2000,
                                year5 : 1000,
                            },
                            {
                                name : 'niuxf2',
                                last : 12000 ,
                                year1 : 14000,
                                year2: 4000,
                                year3 : 13000,
                                year4 : 2000,
                                year5 : 11000,
                            },
                            {
                                name : 'yangwei',
                                last : 11000 ,
                                year1 : 13000,
                                year2: 13000,
                                year3 : 3000,
                                year4 : 12000,
                                year5 : 1000,
                            },
                        ]

                    },
                    chartSettings:{
                        // axisSite:{right:['year1']},
                        // dataOrder : { label: 'last', order: 'asc' },
                        stack : { money:['last','year2'] , year:['year3','year4'] },
                        labelMap:{
                            last:'去年'
                        },
                        legendName:{
                            '去年':'上一年'
                        },
                        showLine:['year1','year5']
                    }

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
        },
        components:{
            D3Line,
            D3Bar,
            PercentStackBar
        },
        mounted() {
            // console.log(this.$route.query.name);
        }
    }
</script>

<style scoped>

</style>
