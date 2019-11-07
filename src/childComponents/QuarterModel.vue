<template>
  <!--季度选择器-->
  <div class="quarterBox" v-clickoutside="handleClickOutSide">
    <div @mouseover="quarterMouseover" @mouseout="clearable=false">
      <input class="quarterSelect" v-model="value" placeholder="请选择季度" type="text" readonly @click="select = true">
      <Icon v-if="!clearable" size="16" type="ios-calendar-outline" class="monthIcon" style="z-index: -1;"/>
      <Icon v-else size="16" type="ios-close-circle" class="cancelIcon" @click.step="changeQuarter('')" style="z-index: 2;"/>
    </div>
    <div class="everyQuarter" v-if="select">
      <div class="yearBox">{{year}}</div>
      <Icon class="myArrowLeft" type="ios-arrow-back" size="22" @click.stop="prevYear" />
      <Icon class="myArrowRight" type="ios-arrow-forward" size="22" @click.stop="nextYear" />
      <button type="button" class="quarterBtn" :class="addClass(1)" @click.stop="changeQuarter('-Q1')" :disabled="!oneQuarter">一季度</button>
      <button type="button" class="quarterBtn" :class="addClass(2)" @click.stop="changeQuarter('-Q2')" :disabled="!twoQuarter">二季度</button>
      <button type="button" class="quarterBtn" :class="addClass(3)" @click.stop="changeQuarter('-Q3')" :disabled="!threeQuarter">三季度</button>
      <button type="button" class="quarterBtn" :class="addClass(4)" @click.stop="changeQuarter('-Q4')" :disabled="!fourQuarter">四季度</button>
    </div>
  </div>
</template>

<script>
    import clickoutside from '../util/clickoutside'
    export default {
      name: "QuarterModel",
      data(){
        return {
          year:'',
          currentQuarter:'',
          ifQuarterSelect:false,
          oneQuarter:false,
          twoQuarter:false,
          threeQuarter:false,
          fourQuarter:false,
          select:false,
          currentTime:'',
          clearable:false
        }
      },
      directives: {
          'clickoutside': clickoutside
      },
      watch:{
        /**
         * @监听年份的变化
         * */
        year(val){
          this.compareTime()
        },
        /**
         * @监听联动对比值的变化
         * */
        compare(val){
          this.compareTime()
        },
        /**
         * @监听联动对比值的变化
         * */
        select(val){
          this.resetTime()
        },
      },
      created(){
        this.resetTime()
      },
      mounted(){
      },
      methods:{
        /*
        * @初始化select的时间
        * */
        resetTime(){
          this.year = this.value && this.value.split('-Q')[0] || new Date().getFullYear();//接收传递过来的当前时间的年份
          this.currentQuarter = this.value.split('-Q')[1] || '';//接收传递过来的当前时间的季度
        },
        /*
        * @移入时日历图标和清除图标互换
        * */
        quarterMouseover(){
          this.clearable = this.value !== ''
        },
        /**
         * @将传入的时间转换为毫秒
         * */
        quarterTransition(time){
          return new Date(time).getTime();
        },
        /**
         * @将当前季度转换为毫秒
         * */
        nowTimeTransition(quarter){
          let splitArr = quarter.split('-Q')
          let monthObj = {
            "1": '-01-01' ,
            "2": '-04-01' ,
            "3": '-07-01' ,
            "4": '-10-01' ,
          }
          return new Date(splitArr[0] + monthObj[splitArr[1]]).getTime()
        },
        /**
         * @年份切换-上一年
         * */
        prevYear(){
          this.currentQuarter = '';
          this.year--;
        },
        /**
         * @年份切换-下一年
         * */
        nextYear(){
          if(this.year < new Date().getFullYear()){
            this.year++;
            this.currentQuarter = '';
          }
        },
        /**
         * @选择季度触发的事件
         * */
        changeQuarter(value){
          this.currentTime = value ? this.year + value : '';
          this.clearable = false
          this.select = false
          this.$emit('input',this.currentTime)
          this.$emit('change',this.currentTime)
        },
        /**
        * @当前选择器的时间和需要做对比的值来确定是否disabled
        * */
        compareTime(){
          let oneTime = this.quarterTransition(this.year + '-01-01');
          let twoTime = this.quarterTransition(this.year + '-04-01');
          let threeTime = this.quarterTransition(this.year + '-07-01');
          let fourTime = this.quarterTransition(this.year + '-10-01');
          let timeNow = this.compare && this.nowTimeTransition(this.compare) || new Date().getTime();
          if(this.compare && this.type === 'end'){
            this.oneQuarter = oneTime >= timeNow
            this.twoQuarter = twoTime >= timeNow
            this.threeQuarter = threeTime >= timeNow
            this.fourQuarter = fourTime >= timeNow
          } else {
            this.oneQuarter = oneTime <= timeNow;
            this.twoQuarter = twoTime <= timeNow;
            this.threeQuarter = threeTime <= timeNow;
            this.fourQuarter = fourTime <= timeNow;
          }
        },
        /**
        * @改变被选择的样式
        * */
        addClass(quarterIndex){
          if( quarterIndex == this.currentQuarter ){
            return 'quarterChoose'
          }
        },
        /*
        * @自定义组件判断点击是否为自身
        * */
        handleClickOutSide(){
          this.select = false
        }
      },
      /**
      * @父页面传递的数据
       * @ value         {String}   父组件v-model绑定的值
      * @ compare       {String}   需要做对比的时间
      * @ type          {String}   需要选择的状态 start end
      * */
      props:{
        value:{
          type:String,
        }, // 用于构成双向数据流绑定；不用暴漏到外部接口。默认就是叫 value 规定死，父的绑定值就自动初始化传进来了,
        compare:{
          type:String,
        },
        type:{
          type:String,
        },
      },
    }
</script>

<style scoped lang="less">

  .quarterBox{
    width: 100%;
    height: 34px;
    line-height: 34px;
    position: relative;
    z-index: 1000;
    .quarterSelect{
      z-index: 1;
      padding-left: 8px;
      width: 100%;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      background-color:transparent;
    }
    .quarterSelect:hover{
      border: 1px solid #57a3f3;
    }
    .monthIcon{
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .cancelIcon{
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }
    .everyQuarter{
      position: absolute;
      top: 36px;
      width: 160px;
      height: 140px;
      background-color: #fff;
      border: 1px solid #dcdee2;
      box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
      border-radius:4px;
    }
    .yearBox{
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #dcdee2 ;
    }
    .myArrowLeft{
      position: absolute;
      top: 0px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 40px;
    }
    .myArrowRight{
      position: absolute;
      top: 0;
      right: 0;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 40px;
    }
    .quarterBtn{
      border: none;
      width: 50%;
      background-color: transparent;
      outline: none;
      height: 46px;
      font-size: 14px;
      float: left;
    }
    .quarterBtn:disabled{
      cursor: not-allowed;
    }
    .quarterChoose{
      color:#57a3f3;
    }
  }
</style>
