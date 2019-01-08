<template>
    <div class="quarterTpl">
      <div class="quarterBox" @mouseout="mouseOut" @mouseover="mouseOver">
        <input id="quarterSelect" placeholder="请选择季度" v-model="quarterTime" type="text" readonly @click="changeBlock" @focus="quarterFocus" @blur="quarterBlur">
        <Icon size="16" v-if="hasTime" type="ios-calendar-outline" class="monthIcon" />
        <Icon size="16" v-if="!hasTime" type="ios-close-circle" class="cancelIcon" @click="clearQuarter" />
      </div>
      <div class="everyQuarter" v-if="ifQuarterSelect">
        <div class="yearBox">{{year}}</div>
        <Icon class="myArrowLeft" type="ios-arrow-back" size="18" @click.stop="prevYear" />
        <Icon class="myArrowRight" type="ios-arrow-forward" size="18" @click.stop="nextYear" />
        <button class="quarterBtn" @click.stop="changeQuarter('-Q1')" :disabled="oneQuarter">一季度</button>
        <button class="quarterBtn" @click.stop="changeQuarter('-Q2')" :disabled="twoQuarter">二季度</button>
        <button class="quarterBtn" @click.stop="changeQuarter('-Q3')" :disabled="threeQuarter">三季度</button>
        <button class="quarterBtn" @click.stop="changeQuarter('-Q4')" :disabled="fourQuarter">四季度</button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "QuarterSelect",
      data(){
        return {
          hasTime:true,
          quarterTime:'',
          year:'',
          ifQuarterSelect:false,
          oneQuarter:false,
          twoQuarter:false,
          threeQuarter:false,
          fourQuarter:false,
          _paramsTime:'',


        }
      },
      watch:{
        year(val){
          this.compareTime()
        },
        quarterTime(val){
          this.emitQuarter(val);
        }
      },
      created(){
        this._paramsTime = JSON.parse(JSON.stringify(this.paramsTime))
      },
      mounted(){
        this.year = this._paramsTime.time && this._paramsTime.time.split('-')[0] || new Date().getFullYear();
        this.compareTime();
        // let that = this;
        document.onclick = ()=>{
          this.ifQuarterSelect = false;
        }
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
        quarterFocus(){
          // this.ifQuarterSelect = true;
          // this.$refs.everyQuarter.style.display = 'block';
        },
        quarterBlur(e){
          console.log(2)
        },
        emitQuarter(value){
          this.$emit('quarter',value)
        },
        mouseOver(){
          if(this.quarterTime){
            this.hasTime = false
          }else{
            this.hasTime = true
          }
        },
        mouseOut(){
          this.hasTime = true
        },
        clearQuarter(e){
          e.stopPropagation();
          this.quarterTime = '';
        },
        changeBlock(e){
          e.stopPropagation()
          // this.ifQuarterSelect = false;
          this.ifQuarterSelect = true;
        },
        prevYear(){
          console.log(1)
          this.year--
        },
        nextYear(){
          if(this.year < new Date().getFullYear()){
            this.year++
          }
        },
        changeQuarter(value){
          this.quarterTime = this.year + value;
          this.ifQuarterSelect = false
        },
        compareTime(){
          let oneTime = this.quarterTransition(this.year + '-03');
          let twoTime = this.quarterTransition(this.year + '-06');
          let threeTime = this.quarterTransition(this.year + '-09');
          let fourTime = this.quarterTransition(this.year + '-12');
          let timeNow = this.nowTimeTransition(this._paramsTime.time);
          if(this._paramsTime.type === 'end'){
            this.oneQuarter = oneTime < timeNow;
            this.twoQuarter = twoTime < timeNow;
            this.threeQuarter = threeTime < timeNow;
            this.fourQuarter = fourTime < timeNow;
          }
          if(this._paramsTime.type === 'start'){
            this.oneQuarter = oneTime > timeNow;
            this.twoQuarter = twoTime > timeNow;
            this.threeQuarter = threeTime > timeNow;
            this.fourQuarter = fourTime > timeNow;
          }
        }
      },
      props:['paramsTime']
    }
</script>

<style scoped>
  .quarterTpl{
    position: relative;
    font-family: "PingFangSC-Regular";
  }
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
  #quarterSelect{
    padding-left: 8px;
    width: 100%;
    border: 1px solid #dcdee2;
    border-radius: 4px;
  }
  #quarterSelect:hover{
    border: 1px solid #57a3f3;
  }
  .everyQuarter{
    position: absolute;
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
</style>

