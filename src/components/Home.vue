<template>
  <div>
    <Button type="default" @click="useTransmit">使用传递的值</Button>
    <Form label-position="top">
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="报税期间">
            <Col span="11">
              <div class="quarterBox" @mouseout="startMouseout" @mouseover="startMouseover">
                <input class="quarterSelect" placeholder="请选择季度" v-model="startTime" type="text" readonly @click.stop="changeStartBlock">
                <Icon size="16" v-if="hasStartTime" type="ios-calendar-outline" class="monthIcon" />
                <Icon size="16" v-if="!hasStartTime" type="ios-close-circle" class="cancelIcon" @click.stop="clearStartQuarter" />
              </div>
              <div class="changeQuarterModel" v-if="ifChangeStart">
                <QuarterModel timeType="start" :currentTime="startTime" :compare="endTime" v-on:quarter="getStartTime"></QuarterModel>
              </div>
            </Col>
            <Col span="2">
              -
            </Col>
            <Col span="11">
              <div class="quarterBox" @mouseout="endMouseout" @mouseover="endMouseover">
                <input class="quarterSelect" placeholder="请选择季度" v-model="endTime" type="text" readonly @click.stop="changeEndBlock">
                <Icon size="16" v-if="hasEndTime" type="ios-calendar-outline" class="monthIcon" />
                <Icon size="16" v-if="!hasEndTime" type="ios-close-circle" class="cancelIcon" @click.stop="clearEndQuarter" />
              </div>
              <div class="changeQuarterModel" v-if="ifChangeEnd">
                <QuarterModel timeType="end" :currentTime="endTime" :compare="startTime" v-on:quarter="getEndTime"></QuarterModel>
              </div>
            </Col>
          </FormItem>
        </Col>
      </Row>

    </Form>
  </div>
</template>

<script>
  import QuarterModel from '../childComponents/QuarterModel'
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
  import {CedorUtils} from "../util/base"
  import * as api from '../api/Home'

  export default {
      name: "Home",
      data(){
        return {
          hasStartTime:true,
          hasEndTime:true,
          startTime:'',
          endTime:'',
          ifChangeStart:false,
          ifChangeEnd:false,
          transmitValue:'',
          util:new CedorUtils(),
        }
      },
      computed:{
        // ...mapState({
        //   params:'parmas'
        // }),

        // 方法二: 直接在computed里面引入获取params的方法
        ...mapGetters(['getParams']),
      },
      created(){
        this.transmitValue = this.getParams
      },
      methods:{
        // ...mapGetters(['getParams']),//注册getParams方法
        getStartTime(time){
          this.startTime = time;
          this.ifChangeStart = false;
        },
        startMouseover(){
          if(this.startTime){
            this.hasStartTime = false;
          }else{
            this.hasStartTime = true;
          }
        },
        startMouseout(){
          this.hasStartTime = true;
        },
        clearStartQuarter(){
          this.startTime = '';
        },
        changeStartBlock(){
          this.ifChangeStart = true;
          this.ifChangeEnd = false;
        },



        getEndTime(time){
          this.endTime = time;
          this.ifChangeEnd = false;
        },
        endMouseover(){
          if(this.endTime){
            this.hasEndTime = false;
          }else{
            this.hasEndTime = true;
          }
        },
        endMouseout(){
          this.hasEndTime = true;
        },
        clearEndQuarter(){
          this.endTime = '';
        },
        changeEndBlock(){
          this.ifChangeEnd = true;
          this.ifChangeStart = false;
        },

        useTransmit(){
          // console.log(this.transmitValue.value);//使用传递的值
          // let params = {
          //   name:'彭旭灿',
          //   age:26
          // }
          // this.util.setLocalValue('firstParams',JSON.stringify(params))
          // let newparams = this.util.getLocalValue('firstParams');

          // newparams.age = 27;
          // this.util.setLocalValue('firstParams',JSON.stringify(newparams))
          // console.log(this.util.setThousand('-300', 1));
          // console.log(this.util.trimString('   -3 0 0   '));
          // console.log(this.util.sortArray([1, 1, 1, 13, 3, 3, 34, 4, 4, 2, 6, 7, 8, 4]));
          // console.log(this.util.removeRepeat(this.util.sortArray(this.util.concatArray([ 6, 7, 8, 4],[3,4,5,6]))));
          // console.log(this.util.getUrlHash('http://www.my.com?id=3&name=cedor&product=phone').name);
          // console.log(this.util.setTimeFilter(1519862400000,'YYYY-MM-DD hh:mm:ss'))
          // console.log(this.util.validateDecimals('-1,400,000.2311'))
          // console.log(this.util.validateThousand('-1,400,000.2311'))
          // console.log(this.util.validateInteger('-12311'))
          // console.log(this.util.validateEmail('17600_peng834351@qq.com'))
          // console.log(this.util.validateNoneChinese('17600peng834351qqcom'))
          // console.log(this.util.validateEnglish('pengq.q_com_'))
          // console.log(this.util.validateNoneChinese(''))
          // console.log(this.util.replaceString('老子今天不上班','上','下'))
          // console.log('老子今天不上班'.replace(/\上/g, '下'));
          // api.getGetValue({msg:111}).then(res=>{
          //   console.log(res);
          // })
          // console.log(this.util.totalCount([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
          let oldObj = {
            a:1,
            b:{
              c:2
            }
          }
          let newObj = this.util.deepCopy(oldObj)
          newObj.b.c = 3;
          console.log(oldObj,newObj);

        }


      },
      mounted(){
        // this.transmitValue = JSON.parse(JSON.stringify(this.getParams()))//将getParams传递的值深拷贝赋值给当前页面的变量
        document.onclick = ()=>{
          this.ifChangeStart = false;
          this.ifChangeEnd = false;
        }
        console.log(this.transmitValue.id);

      },
      components:{
        QuarterModel
      }
    }

</script>

<style scoped>
  .quarterBox{
    width: 100%;
    position: relative;
    z-index: 1000;
  }
  .monthIcon{
    position: absolute;
    top: 8px;
    right: 8px;
  }
  .cancelIcon{
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }
  .changeQuarterModel{
    position: absolute;
    top: 34px;
    left: 0;
  }
  .quarterSelect{
    padding-left: 8px;
    width: 100%;
    border: 1px solid #dcdee2;
    border-radius: 4px;
  }
  .quarterSelect:hover{
    border: 1px solid #57a3f3;
  }
</style>
