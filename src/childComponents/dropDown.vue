<!--HTML-->
<!--<dropTree-->
<!--  v-model="demoParams.value"-->
<!--  :options="demoParams.options"-->
<!--  clearable-->
<!--  selectAll-->
<!--  filter-->
<!--  require-->
<!--  search-->
<!--  name="demoParams"-->
<!--  @filterChange="filterChange"/>-->
<!--api and 方法-->
<!-- v-model 当前组件绑定的值,具体可参照当前组件中的demoParams-->
<!-- options 当前组件所要显示的选项,具体可参照当前组件中的demoParams-->
<!-- 1. clearable 是否可reset清除选项-->
<!-- 2. selectAll 是否可全选和全不选-->
<!-- 3. filter    是否过滤(options过滤)-->
<!-- 4. require   是否为必选-->
<!-- 5. search    过滤是否需要后端请求-->
<!-- 6. name      调用当前组件的name search后端接口筛选的时候,必传-->
<!-- 7. filterChange      后端接口进行筛选的时候,通过返回的name和search_value请求接口-->
<!--todo:当前做了两种后端接口筛选方案 1.直接在组件内部调用接口 2.组件内部返回当前组件name和search_value,父组件调用接口改变options-->

<template>
  <div class="dropTree" v-clickoutside="closeOptions">
    <div class="dropTree--require" v-if="require">*</div>
    <div class="dropTree--model" @click="toggle" @mousemove="inputMouseover" @mouseout="inputMouseout">
      <div class="dropTree--model__placeholder" v-if="value.length === 0">{{placeholder}}</div>
      <div class="dropTree--model__value" v-if="value.length !== 0">
        <span class="dropTree--model__value-text fl">{{label[value[0]] || value[0]}}</span>
        <span class="fl" v-if="value.length > 1">(+{{value.length - 1}})</span>
      </div>
      <i class="dropTree--set el-icon-circle-close" v-show="clearable && isShowClear"  @click.stop="clearValue"></i>
      <i
        class="dropTree--set label-icon"
        :class="isShowOptions ? 'el-icon-arrow-up' : 'el-icon-arrow-left'"
        v-show="!isShowClear"
      ></i>
    </div>
    <transition name="el-zoom-in-top">
      <div class="dropTree--options" v-show="isShowOptions">
        <el-scrollbar>
          <el-input v-model="searchValue" placeholder="filter" v-if="filter"></el-input>
          <div class="dropTree--utils">
            <span class="dropTree--util__selectAll fl" @click="changeValue(true)">Select All</span>
            <span class="dropTree--util__selectNone fr" @click="changeValue(false)">None</span>
          </div>
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'dropDown',
    props: {
      name:{
        type:String,
        default:''
      },
      placeholder:{
        type:String,
        default:'Select'
      },
      clearable:{
        type:Boolean,
        default:false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      filter: {
        type: Boolean,
        default: false
      },
      checkAll: {
        type: Boolean,
        default: false
      },
      search: {
        type: Boolean,
        default: false
      },
      searchParams: {
        default: null
      },
      require: {
        type: Boolean,
      },
      value: [Array],
      options:[Array],


    },
    data () {
      return {
        searchTimer:null,
        label:{},
        isShowOptions:false,
        isShowClear:false,
        searchValue:'',
        filterOptions:[],
        selectValue:[],
        demoParams:{
          value:['1','2','3','4'],
          options:[
            {
              label:'pengxc2',
              value: '1',
              children:[
                {
                  label:'chuym1',
                  value: '6'
                },
                {
                  label:'chuym1',
                  value: '7'
                },
                {
                  label:'chuym1',
                  value: '8'
                },
              ]
            },
            {
              label:'niuxf2',
              value: '2'
            },
            {
              label:'shijh1211111111123',
              value: '3',
              children: [
                {
                  label:'chuym1',
                  value: '9'
                },
                {
                  label:'chuym1',
                  value: '10'
                },
                {
                  label:'chuym1',
                  value: '11'
                },
              ]
            },
            {
              label:'chuym1',
              value: '4',
              children:[
                {
                  label:'chuym1',
                  value: '12'
                },
                {
                  label:'chuym1',
                  value: '13'
                },
                {
                  label:'chuym1',
                  value: '14'
                },
              ]
            },
            {
              label:'chuym1',
              value: '5'
            },
          ],
          searchParams:{
            url:'serviceUpsell/getFilterByTerm',
            params:{
              search_nameKey:'search_type',
              search_name:'ISR',
              search_valueKey:'search_value',
            }
          }
        },
      }
    },
    watch: {
      searchValue:function(val){
        if(this.search){
          // this._debounce(this.getFilterOptions)
          this._debounce(()=>{
            this.$emit('filterChange',{name:this.name , value : val})
          })
        }else{
        }
      },
      options:function(val){
        this.getEveryOne(this.options).forEach(v=>{
          this.label[v.value] = v.label
        })
      },
    },
    methods: {
      _debounce(fn){
        if (this.searchTimer) {
          clearTimeout(this.searchTimer)
        }
        this.searchTimer = setTimeout(fn, 500)
      },
      async getFilterOptions(){
        let params = {
          [this.searchParams.params.search_nameKey]: this.searchParams.params.search_name,
          [this.searchParams.params.search_valueKey]: this.searchValue
        }
        try {
          let res = await this.axios.post(`${this.this.searchParams.url}`, params)
          if (res.data.status === 200) {
            this.filterOptions = res.data.data.map(item=>{
              return {
                label:item,
                value:item
              }
            })
          } else {
            console.log('getTimeFilter接口错误')
          }
        } catch (e) {
          console.log(e)
        }
      },

      closeOptions(){
        this.isShowOptions = false
      },
      inputMouseover(){
        this.isShowClear = this.value.length !== 0
      },
      inputMouseout(){
        this.isShowClear = false
      },
      clearValue(){
        this.selectValue = []
        this.$emit('input', []);
        this.$emit('change', []);
        this.$refs.tree.setCheckedNodes(this.selectValue);
      },
      toggle(){
        this.isShowOptions = !this.isShowOptions
      },
      changeValue(type){
        this.selectValue = type ? this.getEveryOne(this.options).map(v=>v.value) : []
        this.$emit('input', this.selectValue);
        this.$emit('change', this.selectValue);
        this.$refs.tree.setCheckedNodes(this.selectValue);
      },
      getEveryOne(array){
        let all = []
        array.forEach(item=>{
          if(item.children){
            all = [...all,...this.getEveryOne(item.children)]
          }else{
            all.push(item)
          }
        })
        return all
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  .dropTree{
    position: relative;
    width: 188px;
    height: 28px;
    padding: 0 14px;
    &--require{
      color: red;
      position: absolute;
      width: 14px;
      height: 16px;
      top: 4px;
      left: 0;
      font-size: 24px;
    }
    &--model{
      width: 160px;
      height: 28px;
      line-height: 26px;
      padding-left: 10px;
      background: #FFFFFF;
      border: 1px solid #D8DCE6;
      border-radius: 4px;
      cursor: pointer;
      z-index: 9;
      &__placeholder{
        font-size: 12px;
        color: #CCCDCC;
      }
      &__value{
        font-size: 12px;
        color: #666766;
        /*height: 28px;*/
        &-text{
          max-width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &:hover{
        border: 1px solid #c0c4cc;
      }
    }
    &--set{
      position: absolute;
      top: 8px;
      right: 22px;
      font-size: 14px;
      &&.el-icon-arrow-up {
        transform: rotate(0);
        transition: transform .2s linear;
      }
      &&.el-icon-arrow-left {
        transform: rotate(-90deg);
        transition: transform .2s linear;
      }
    }
    &--options{
      position: absolute;
      top: 32px;
      left: 14px;
      background: #fff;
      border: 1px solid #E4E7ED;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
      border-radius: 4px;
      max-height: 300px;
      min-width: 160px;
      max-width: 360px;
      z-index: 10;
      /deep/ .el-input__inner {
        width: 90%;
        margin: 0 auto;
        padding:0;
        display: block;
        border: 0;
        border-bottom: 1px solid #DCDFE6;
        border-radius: 0;
        &:focus{
          border-bottom: 1px solid #DCDFE6;
        }
      }
      &:before{
        position: absolute;
        top: -12px;
        left: 20px;
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 6px solid #fff;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        border-top: 6px solid transparent;
      }
    }
    &--utils{
      width: 90%;
      margin: 0 auto;
      display: block;
      border: 0;
      border-bottom: 1px solid #DCDFE6;
      height: 28px;
      line-height: 28px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #007EFF;
      span{
        cursor: pointer;
      }
    }
  }
</style>
<style lang="less">
  .dropTree{
    &--options{
      .el-scrollbar__wrap{
        max-height: 300px;
      }
    }
  }

</style>
