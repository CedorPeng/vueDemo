<template>
  <div>
    <div class="everyQuarter">
      <div class="yearBox">{{year}}</div>
      <Icon class="myArrowLeft" type="ios-arrow-back" size="18" @click.stop="prevYear" />
      <Icon class="myArrowRight" type="ios-arrow-forward" size="18" @click.stop="nextYear" />
      <button class="quarterBtn" :class="addClass(1)" @click.stop="changeQuarter('-Q1')" :disabled="oneQuarter">一季度</button>
      <button class="quarterBtn" :class="addClass(2)" @click.stop="changeQuarter('-Q2')" :disabled="twoQuarter">二季度</button>
      <button class="quarterBtn" :class="addClass(3)" @click.stop="changeQuarter('-Q3')" :disabled="threeQuarter">三季度</button>
      <button class="quarterBtn" :class="addClass(4)" @click.stop="changeQuarter('-Q4')" :disabled="fourQuarter">四季度</button>
    </div>
  </div>
</template>

<script>
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
      watch:{
        year(val){
          this.compareTime()
        },
      },
      created(){
        this.currentCompare = this.compare;
        this.compareRule = this.timeType;
        this.year = this.currentTime && this.currentTime.split('-Q')[0] || new Date().getFullYear();
        this.currentQuarter = this.currentTime && this.currentTime.split('-Q')[1] || ''
      },
      mounted(){
        this.compareTime();
      },
      methods:{
        quarterTransition(time){
          return new Date(time).getTime();
        },
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
        emitQuarter(value){
          this.$emit('quarter',value)
        },
        prevYear(){
          this.currentQuarter = '';
          this.year--;
        },
        nextYear(){
          if(this.year < new Date().getFullYear()){
            this.year++;
            this.currentQuarter = '';
          }
        },
        changeQuarter(value){
          let paramsTime = this.year + value;
          this.emitQuarter(paramsTime)
        },
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
        addClass(quarterIndex){
          if( quarterIndex == this.currentQuarter ){
            return 'quarterChoose'
          }
        }
      },
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
