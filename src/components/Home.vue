<template>
    <div>
        <Button type="default" @click="useTransmit">使用传递的值</Button>
        <div>{{num | setThousand(3) }}</div>
        <div>
            <QuarterModel
                    style="width: 300px;display: inline-block;"
                    v-model="startTime"
                    type="start"
                    :compare="endTime"
                    @change="startTimeChange"
            ></QuarterModel>
            <QuarterModel
                    style="width: 300px;display: inline-block;"
                    v-model="endTime"
                    type="end"
                    :compare="startTime"
            ></QuarterModel>
        </div>
        <m_dialog
            v-model="dialogShow"
            title="title"
            :close="true"
            :footer="true"
            top="50"
            width="70%"
            ><div>zheshitanceng</div>
        </m_dialog>
    </div>
</template>

<script>
    // import QuarterModel from '../childComponents/QuarterModel'
    import HoverDropdown from '../childComponents/HoverDropdown'
    // import {mapState} from 'vuex'//引入vuex的mapGetters方法
    /**
     * @vuex传值的方法二 : 接收值
     * @引入vuex接收值的mapGetters
     * @在computed中注册接收值的方法  语法: ...mapGetters(['getters模块中命名的方法'])
     * @直接使用该方法return出来的值
     * @例如:  直接使用this.getParams
     * @       用vue中声明的值接收之后在使用  this.transmitValue = this.getParams
     * */
    import {mapGetters} from 'vuex'
    import * as api from '../api/Home'
    import MDialog from '../childComponents/MDialog'
    import myPromise from '@/util/promise'

    export default {
        name: "Home",
        data() {
            return {
                startTime: '',
                endTime: '',
                transmitValue: '',
                num: 123456,
                dialogShow:false,
            }
        },
        computed: {
            // ...mapState({
            //   params:'parmas'
            // }),

            // 方法二: 直接在computed里面引入获取params的方法
            ...mapGetters(['getParams']),
        },
        created() {
            this.transmitValue = this.getParams
        },
        methods: {
            useTransmit() {
                // console.log(this.transmitValue.value);//使用传递的值
                // let params = {
                //   name:'彭旭灿',
                //   age:26
                // }
                // this.CedorUtils.setLocalValue('firstParams',JSON.stringify(params))
                // let newparams = this.CedorUtils.getLocalValue('firstParams');

                // newparams.age = 27;
                // this.CedorUtils.setLocalValue('firstParams',JSON.stringify(newparams))
                // console.log(this.CedorUtils.setThousand('-300', 1));
                // console.log(this.CedorUtils.trimString('   -3 0 0   '));
                // console.log(this.CedorUtils.sortArray([1, 1, 1, 13, 3, 3, 34, 4, 4, 2, 6, 7, 8, 4]));
                // console.log(this.CedorUtils.removeRepeat(this.CedorUtils.sortArray(this.CedorUtils.concatArray([ 6, 7, 8, 4],[3,4,5,6]))));
                // console.log(this.CedorUtils.getUrlHash('http://www.my.com?id=3&name=cedor&product=phone').name);
                // console.log(this.CedorUtils.setTimeFilter(1519862400000,'YYYY-MM-DD hh:mm:ss'))
                // console.log(this.CedorUtils.validateDecimals('-1,400,000.2311'))
                // console.log(this.CedorUtils.validateThousand('-1,400,000.2311'))
                // console.log(this.CedorUtils.validateInteger('-12311'))
                // console.log(this.CedorUtils.validateEmail('17600_peng834351@qq.com'))
                // console.log(this.CedorUtils.validateNoneChinese('17600peng834351qqcom'))
                // console.log(this.CedorUtils.validateEnglish('pengq.q_com_'))
                // console.log(this.CedorUtils.validateNoneChinese(''))
                // console.log(this.CedorUtils.replaceString('老子今天不上班','上','下'))
                // console.log('老子今天不上班'.replace(/\上/g, '下'));
                // api.getGetValue({msg:111}).then(res=>{
                //   console.log(res);
                // })
                // console.log(this.CedorUtils.totalCount([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
                // let oldObj = {
                //   a:1,
                //   b:{
                //     c:2
                //   }
                // }
                // let newObj = this.CedorUtils.deepCopy(oldObj)
                // newObj.b.c = 3;
                // console.log(oldObj,newObj);
                // this.eventBus.$emit('close','home')
                // this.$Message.success('成功提示')
                // console.log(this.CedorUtils.countAndSay('1234512351231323132345','1234'));
                let promise = new myPromise((resolve, reject) => {
                    // throw new Error('报错了')
                    setTimeout(() => {
                      resolve(123);
                    }, 1000);
                  }
                )
                let p1 = promise.then(success=>{
                  console.log(success,'success');
                  return 123456
                },err=>{
                  console.log(err,'err');
                })
                p1.then(success1=>{
                  console.log(success1,'success1');
                },err1=>{
                  console.log(err1,'err1');
                })

            },
            startTimeChange(value) {
            },


        },
        mounted() {
            // this.transmitValue = JSON.parse(JSON.stringify(this.getParams()))//将getParams传递的值深拷贝赋值给当前页面的变量

        },
        components: {
            HoverDropdown,
            m_dialog:MDialog
        }
    }

</script>

<style scoped>
    .quarterBox {
        width: 100%;
        position: relative;
        z-index: 1000;
    }

    .monthIcon {
        position: absolute;
        top: 8px;
        right: 8px;
    }

    .cancelIcon {
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 1;
    }

    .changeQuarterModel {
        position: absolute;
        top: 34px;
        left: 0;
    }

    .quarterSelect {
        padding-left: 8px;
        width: 100%;
        border: 1px solid #dcdee2;
        border-radius: 4px;
    }

    .quarterSelect:hover {
        border: 1px solid #57a3f3;
    }

</style>
