<template>
  <div>
    <Form label-position="top">
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="报税期间">
            <Col span="24">
              <DatePicker type="month" placeholder="Select date"></DatePicker>
            </Col>
          </FormItem>
        </Col>
        <!--<Col span="6">-->
          <!--<FormItem label="报税期间">-->
            <!--<Col span="11">-->
              <!--<QuarterSelect :paramsTime="paramsStart" v-on:quarter="getStartTime"></QuarterSelect>-->
            <!--</Col>-->
            <!--<Col span="2">-->
              <!-- - -->
            <!--</Col>-->
            <!--<Col span="11">-->
              <!--<QuarterSelect :paramsTime="paramsEnd" v-on:quarter="getEndTime"></QuarterSelect>-->
            <!--</Col>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <Col span="6">
          <FormItem label="报税期间">
            <Col span="11">
              <div class="quarterBox" @mouseout="startMouseout" @mouseover="startMouseover">
                <input class="quarterSelect" placeholder="请选择季度" v-model="startTime" type="text" readonly @click.stop="changeStartBlock">
                <Icon size="16" v-if="hasStartTime" type="ios-calendar-outline" class="monthIcon" />
                <Icon size="16" v-if="!hasStartTime" type="ios-close-circle" class="cancelIcon" @click.stop="clearStartQuarter" />
                <div class="changeQuarterModel" v-if="ifChangeStart">
                  <QuarterModel timeType="start" :currentTime="startTime" :compare="endTime" v-on:quarter="getStartTime"></QuarterModel>
                </div>
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
                <div class="changeQuarterModel" v-if="ifChangeEnd">
                  <QuarterModel timeType="end" :currentTime="endTime" :compare="startTime" v-on:quarter="getEndTime"></QuarterModel>
                </div>
              </div>
            </Col>
          </FormItem>
        </Col>

      </Row>

    </Form>
  </div>
</template>

<script>
  import QuarterModel from './childComponents/QuarterModel'
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
        }
      },
      methods:{
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


      },
      mounted(){
        document.onclick = ()=>{
          this.ifChangeStart = false;
          this.ifChangeEnd = false;
        }

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
