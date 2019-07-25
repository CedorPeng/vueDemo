<template>
  <!--季度选择器-->
  <div>
    <div class="everyQuarter" v-clickoutside="handleClickOutSide">
      <div class="yearBox">{{year}}</div>
      <Icon class="myArrowLeft" type="ios-arrow-back" size="18" @click.stop="prevYear" />
      <Icon class="myArrowRight" type="ios-arrow-forward" size="18" @click.stop="nextYear" />
      <button type="button" class="quarterBtn" :class="addClass(1)" @click.stop="changeQuarter('-Q1')" :disabled="oneQuarter">一季度</button>
      <button type="button" class="quarterBtn" :class="addClass(2)" @click.stop="changeQuarter('-Q2')" :disabled="twoQuarter">二季度</button>
      <button type="button" class="quarterBtn" :class="addClass(3)" @click.stop="changeQuarter('-Q3')" :disabled="threeQuarter">三季度</button>
      <button type="button" class="quarterBtn" :class="addClass(4)" @click.stop="changeQuarter('-Q4')" :disabled="fourQuarter">四季度</button>
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
          currentCompare:'',
          compareRule:'',
          currentQuarter:'',
          ifQuarterSelect:false,
          oneQuarter:false,
          twoQuarter:false,
          threeQuarter:false,
          fourQuarter:false,
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
      },
      created(){
        this.currentCompare = this.compare;//接收传过来的对比的时间
        this.compareRule = this.timeType;//接收传过来的选择状态 start end
        this.year = this.currentTime && this.currentTime.split('-Q')[0] || new Date().getFullYear();//接收传递过来的当前时间的年份
        this.currentQuarter = this.currentTime && this.currentTime.split('-Q')[1] || '';//接收传递过来的当前时间的季度
      },
      mounted(){
        this.compareTime();
      },
      methods:{
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
            "1": '-03' ,
            "2": '-06' ,
            "3": '-09' ,
            "4": '-12' ,
          }
          return new Date(splitArr[0] + monthObj[splitArr[1]]).getTime()
        },
        /**
         * 往父组件传递值
         * */
        emitQuarter(value){
          this.$emit('quarter',value)
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
          let paramsTime = this.year + value;
          this.emitQuarter(paramsTime)
        },
        /**
        * @当前选择器的时间和需要做对比的值来确定是否disabled
        * */
        compareTime(){
          let oneTime = this.quarterTransition(this.year + '-03');
          let twoTime = this.quarterTransition(this.year + '-06');
          let threeTime = this.quarterTransition(this.year + '-09');
          let fourTime = this.quarterTransition(this.year + '-12');
          let timeNow = this.nowTimeTransition(this.currentCompare);
          if(this.compareRule === 'end' && timeNow){
            this.oneQuarter = oneTime < timeNow;
            this.twoQuarter = twoTime < timeNow;
            this.threeQuarter = threeTime < timeNow;
            this.fourQuarter = fourTime < timeNow;
          }
          if(this.compareRule === 'start' && timeNow){
            this.oneQuarter = oneTime > timeNow;
            this.twoQuarter = twoTime > timeNow;
            this.threeQuarter = threeTime > timeNow;
            this.fourQuarter = fourTime > timeNow;
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
        handleClickOutSide(){
          console.log('我该消失了')
        }
      },
      /**
      * @父页面传递的数据
      * @ compare       {String}   需要做对比的时间
      * @ timeType      {String}   需要选择的状态 start end
      * @ currentTime   {String}   需要接收的当前时间
      * */
      props:['compare','timeType','currentTime']
    }
</script>

<style scoped>
  .everyQuarter{
    position: relative;
    width: 160px;
    height: 140px;
    background-color: #fff;
    border: 1px solid #dcdee2;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
    border-radius:4px;
  }
  .yearBox{
    padding: 10px 0;
    line-height: 24px;
    margin:0 auto;
    font-size: 12px;
    color: #333;
    text-align: center;
    border-bottom: 1px solid #dcdee2 ;
  }
  .myArrowLeft{
    position: absolute;
    top: 14px;
    left: 20px;
  }
  .myArrowRight{
    position: absolute;
    top: 14px;
    right: 20px;
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
</style>
