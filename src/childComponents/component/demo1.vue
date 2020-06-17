<template>
  <div>
    <!--<div>收款管理</div>-->
    <div class="top" v-show="slideUpFlag">
      <Form ref="formTop" :model="formTop" :rules="formTopValidate" label-position="top">
        <Row :gutter="10">
          <Col span="6">
            <!-- <FormItem label="创建日期">
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="formTop.startDateC"
                  @on-change="startTimeChange2"
                  :options="startTimeOptions2"
                ></DatePicker>
              </Col>
              <Col span="2" class="text_c">
                <DatePicker type="date" placeholder="">-</DatePicker>
              </Col>
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="formTop.endDateC"
                  @on-change="endTimeChange2"
                  :options="endTimeOptions2"
                ></DatePicker>
              </Col>
            </FormItem> -->
            <form-item-datepicker
              label="创建日期"
              :hasEndDate="true"
              :dateType="['date','date']"
              :datePlaceHolder="['选择开始日期','选择结束日期']"
              :startDate.sync="formTop.startDateC"
              :endDate.sync="formTop.endDateC"
              :startDateOptions="startTimeOptions2"
              :endDateOptions="endTimeOptions2"
              :eventOpts="eventOptions1"
              :colspan="['11','2','11']">

            </form-item-datepicker>
          </Col>
          <Col span="6">
            <!-- <FormItem class="enterDate" label="入账会计日期" prop="startDateM">
              <Col span="24">
                <DatePicker
                  class="date"
                  type="month"
                  :editable="false"
                  placeholder="选择入账会计日期"
                  v-model="formTop.startDateM"
                  @on-change="startTimeChange"
                  :options="startTimeOptions"
                ></DatePicker>
              </Col>
            </FormItem> -->
            <form-item-datepicker
              :formItemClassName="['enterDate']"
              :startDatePickerClassName="['date']"
              label="入账会计日期"
              datePlaceHolder="选择入账会计日期"
              :hasEndDate="false"
              dateType="month"
              :startDate.sync="formTop.startDateM"
              :startDateOptions="startTimeOptions"
              :eventOpts="eventOptions1"
              colspan="24"
            >
            </form-item-datepicker>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="交易日期">
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="formTop.startDateS"
                  @on-change="startTimeChange1"
                  :options="startTimeOptions1"
                ></DatePicker>
              </Col>
              <Col span="2" class="text_c">
                <DatePicker type="date" placeholder="" v-model="formTop.date">-</DatePicker>
              </Col>
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="formTop.endDateS"
                  @on-change="endTimeChange1"
                  :options="endTimeOptions1"
                ></DatePicker>
              </Col>
            </FormItem> -->
            <form-item-datepicker
              label="交易日期"
              :hasEndDate="true"
              :dateType="['date','date']"
              :startDate="formTop.startDateC"
              :endDate="formTop.endDateC"
              :startDateOptions="startTimeOptions2"
              :endDateOptions="endTimeOptions2"
              :eventOpts="eventOptions1"
              :colspan="['11','2','11']"
            >
            </form-item-datepicker>
          </Col>
          <Col span="6">
            <!-- <FormItem label="资金流水号" prop="capitalFlowNumber">
              <Input clearable v-model="formTop.capitalFlowNumber"
                     :maxlength=50
                     placeholder="请输入"></Input>
            </FormItem> -->
            <form-item-input
              v-model="formTop.capitalFlowNumber"
              label="资金流水号"
              :eventOpts="eventOptsCapital"
            >
            </form-item-input>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6">
            <!-- <FormItem label="收款单号" prop="receiptNumber">
              <Input clearable v-model="formTop.receiptNumber" :maxlength=50 placeholder="请输入"></Input>
            </FormItem> -->
            <form-item-input
              label="收款单号"
              prop="receiptNumber"
              v-model="formTop.receiptNumber"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="来源:" prop="source">
              <Select v-model="formTop.state" placeholder="请选择" @on-open-change="sourceOpenChange" clearable>
                <Option :value="item.dicCode" v-for="item in formTop.sourceList" :key="item.id">{{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="来源"
              prop="source"
              placeholder="请选择"
              v-model="formTop.state"
              :clearable="true"
              :labelInValue="true"
              :optionList="formTop.recognitionStateList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="金融机构分类" prop="accountType">
              <Select
                class="i-all-multipleSelect"
                v-model="formTop.accountType"
                placeholder="请选择"
                @on-open-change="accountOpenChange"
                multiple
                filterable
                remote
                @on-query-change="accountQuery"
              >
                <Option
                  :value="item.dicCode"
                  v-for="item in formTop.accountList"
                  :key="item.id"
                >{{item.dicNameZh}}</Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="金融机构分类"
              prop="accountType"
              placeholder="请选择"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              v-model="formTop.accountType"
              :optionList="formTop.accountList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="核算主体名称" prop="accountingSubjectName">
              <Select class="i-all-multipleSelect" v-model="formTop.accountingSubjectName" placeholder="请输入" filterable
                      remote multiple @on-open-change="openaccountingSubject" ref="accountingSubjectName"
                      :remote-method="getAccountingSubjectName" @on-query-change="getAccountingSubjectNameChange">
                <Option v-for="item in formTop.mainNameList" :key="item.id" :value="item.financialSystemCode"
                        :label="item.companyQc"></Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="核算主体名称"
              prop="accountingSubjectName"
              placeholder="请输入"
              :multiple="true"
              :remote="true"
              :remoteMethod="getAccountingSubjectName"
              selectClassName="i-all-multipleSelect"
              v-model="formTop.accountingSubjectName"
              :optionList="formTop.mainNameList"
              :optionOpts="{key:'financialSystemCode',label:'companyQc'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6" justify="start">
            <!-- <FormItem label="款项类型" prop="typeOfMoney">
              <Select
                filterable
                remote
                class="i-all-multipleSelect"
                v-model="formTop.typeOfMoney"
                placeholder="请选择"
                @on-open-change="paymentOpenChange"
                @on-query-change="paymentQuery"
                multiple
              >
                <Option
                  :value="item.dicCode"
                  v-for="item in formTop.paymentList"
                  :key="item.id"
                >{{item.dicNameZh}}</Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="款项类型"
              prop="typeOfMoney"
              placeholder="请选择"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              v-model="formTop.typeOfMoney"
              :optionList="formTop.paymentList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="交易币" prop="traadingCurrency">
              <Select class="i-all-multipleSelect" v-model="formTop.traadingCurrency" placeholder="请输入" filterable
                      remote
                      multiple ref="traadingCurrency" @on-open-change="openTraadingCurrency"
                      :remote-method="getTraadingCurrency" @on-query-change="getTraadingCurrencyChange">
                <Option v-for="item in formTop.traadingCurrencyList" :key="item.id" :value="item.dicCode">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="交易币"
              prop="traadingCurrency"
              placeholder="请输入"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              v-model="formTop.traadingCurrency"
              :remoteMethod="getTraadingCurrency"
              :optionList="formTop.traadingCurrencyList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="产品线" prop="businessLine">
              <Select
                class="i-all-multipleSelect"
                v-model="formTop.businessLine"
                placeholder="请选择"
                @on-open-change="businessLineOpenChange"
                multiple
                filterable
                remote
                @on-query-change="businessLineQuery"
                ref="businessLine"
              >
                <Option
                  :value="item.dicCode"
                  v-for="item in formTop.businessLineList"
                  :key="item.id"
                >{{item.dicNameZh}}</Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="产品线"
              prop="businessLine"
              placeholder="请选择"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              v-model="formTop.businessLine"
              :optionList="formTop.businessLineList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptionsbusinessLine">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="我方账号" prop="ourAccount">
              <Select class="i-all-multipleSelect" v-model="formTop.ourAccount" placeholder="请输入" filterable remote
                      multiple ref="ourAccount" @on-open-change="openOurAccount"
                      :remote-method="getOurAccount" @on-query-change="getOurAccountChange">
                <Option v-for="item in formTop.outAccountList" :key="item.id" :value="item.bankInstitutionNumber">
                  {{item.bankInstitutionNumber}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="我方账号"
              prop="ourAccount"
              placeholder="请输入"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              :remoteMethod="getOurAccount"
              v-model="formTop.ourAccount"
              :optionList="formTop.outAccountList"
              :optionOpts="{key:'bankInstitutionNumber',label:'bankInstitutionNumber'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6">
            <!-- <FormItem label="对方账户名" prop="eachOtherAccountName">
              <Input v-model="formTop.eachOtherAccountName" :maxlength=50 placeholder="请输入" clearable></Input>
            </FormItem> -->
            <form-item-input
              label="对方账户名"
              prop="eachOtherAccountName"
              v-model="formTop.eachOtherAccountName"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="商品名称" prop="commodityName">
              <Input v-model="formTop.commodityName" :maxlength=50 placeholder="请输入" clearable></Input>
            </FormItem> -->
            <form-item-input
              label="商品名称"
              prop="commodityName"
              v-model="formTop.commodityName"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6">
            <!-- <FormItem label="本位币" prop="standardCurrency">
              <Select class="i-all-multipleSelect" v-model="formTop.standardCurrency" placeholder="请输入" filterable
                      remote
                      multiple ref="standardCurrency" @on-open-change="openStandardCurrency"
                      :remote-method="getStandardCurrency" @on-query-change="getStandardCurrencyChange">
                <Option v-for="item in formTop.standardCurrencyList" :key="item.id" :value="item.dicCode">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="本位币"
              prop="standardCurrency"
              placeholder="请输入"
              :multiple="true"
              :remote="true"
              selectClassName="i-all-multipleSelect"
              :remoteMethod="getStandardCurrency"
              v-model="formTop.standardCurrency"
              :optionList="formTop.standardCurrencyList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="认款状态" prop="recognitionState">
              <Select @on-change="recognitionStateChange" v-model="formTop.recognitionState" placeholder="请选择" @on-open-change="recognitionOpenChange"
                      clearable>
                <Option :value="item.dicCode" v-for="item in formTop.recognitionStateList" :key="item.id">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="认款状态"
              prop="recognitionState"
              placeholder="请选择"
              v-model="formTop.recognitionState"
              :optionList="formTop.recognitionStateList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6" justify="start">
            <!-- <FormItem label="冲销状态" prop="writeOffState">
              <Select v-model="formTop.writeOffState" placeholder="请选择" @on-open-change="writeOffStateOpenChange"
                      clearable>
                <Option :value="item.dicCode" v-for="item in formTop.writeOffStateList" :key="item.id">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="冲销状态"
              prop="writeOffState"
              placeholder="请选择"
              v-model="formTop.writeOffState"
              :optionList="formTop.writeOffStateList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6">
            <!-- <FormItem label="对方账号" prop="eachOtherAccount">
              <Input clearable v-model="formTop.eachOtherAccount" :maxlength=50 placeholder="请输入"></Input>
            </FormItem> -->
            <form-item-input
              label="对方账号"
              prop="eachOtherAccount"
              v-model="formTop.eachOtherAccount"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6">
            <!-- <FormItem label="创建人" prop="founder">
              <Select
                ref="founder"
                v-model="formTop.founder"
                placeholder="请输入"
                filterable
                remote
                clearable
                @on-change="founderChange"
                @on-open-change="openFounder"
                :remote-method="getFounder"
              >
                <Option
                  v-for="(item,index) in formTop.founderList"
                  :key="item.id"
                  :value="item.id"
                >{{item.id +'-'+ item.name}}</Option>
              </Select>
            </FormItem> -->
            <form-item-input
              label="创建人"
              prop="founder"
              v-model="formTop.founder"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6">
            <!-- <FormItem label="备注" prop="remark">
              <Input clearable v-model="formTop.remark" :maxlength=50 placeholder="请输入"></Input>
            </FormItem> -->
            <form-item-input
              label="备注"
              prop="remark"
              v-model="formTop.remark"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6" justify="start">
            <!-- <FormItem label="入账状态" prop="entryState">
              <Select clearable v-model="formTop.admissionState" placeholder="请选择"
                      @on-open-change="admissionStateOpenChange">
                <Option :value="item.dicCode" v-for="item in admissionStateList" :key="item.id">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="入账状态"
              prop="entryState"
              placeholder="请选择"
              v-model="formTop.admissionState"
              :optionList="formTop.admissionStateList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="推送CE状态" prop="pushState">
              <Select clearable v-model="formTop.pushState" placeholder="请选择" @on-open-change="pushOpenChange">
                <Option :value="item.dicCode" v-for="item in pushStateList" :key="item.id">
                  {{item.dicNameZh}}
                </Option>
              </Select>
            </FormItem> -->
            <form-item-select
              label="推送CE状态"
              prop="pushState"
              placeholder="请选择"
              v-model="formTop.pushState"
              :optionList="formTop.pushStateList"
              :optionOpts="{key:'dicCode',label:'dicNameZh'}"
              :eventOpts="eventOptions2">
            </form-item-select>
          </Col>
          <Col span="6" justify="start">
            <!-- <FormItem label="汇总单号" prop="summaryProceedsCode">
              <Input clearable v-model="formTop.summaryProceedsCode" :maxlength=50 placeholder="请输入"></Input>
            </FormItem> -->
            <form-item-input
              label="汇总单号"
              prop="summaryProceedsCode"
              v-model="formTop.summaryProceedsCode"
              :maxlength="50"
              placeholder="请输入"
            >
            </form-item-input>
          </Col>
          <Col span="6" justify="end">
            <!-- <FormItem style="text-align: right;margin-top:12px;">
              <Button type="primary" @click="searchPayment('formTop')">查询</Button>
              <Button type="default" @click="requestPayment">重置</Button>
            </FormItem> -->
            <form-item-btns
              formItemStyle="text-align: right;margin-top:12px;"
              :btnsOption="btnsOption">
            </form-item-btns>
          </Col>
        </Row>
        <Row :gutter="10" justify="start">
          <Col span="8">
            &nbsp;
          </Col>
          <Col span="8" class="text_c">
            <Icon type="md-slideUp" @click="slideUp"></Icon>
          </Col>
          <Col span="8">
            &nbsp;
          </Col>
        </Row>
      </Form>
    </div>
    <!-- <div class="dicTable" v-show="slideDownFlag">
      <Form ref="formTop123" :model="formTop" :rules="formTopValidate" label-position="top">
        <Row :gutter="10">
          <Col span="6">
            <FormItem label="创建日期11">
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="formTop.startDateC"
                  @on-change="startTimeChange2"
                  :options="startTimeOptions2"
                ></DatePicker>
              </Col>
              <Col span="2" class="text_c">
                <DatePicker type="date" placeholder="">-</DatePicker>
              </Col>
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="formTop.endDateC"
                  @on-change="endTimeChange2"
                  :options="endTimeOptions2"
                ></DatePicker>
              </Col>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem class="enterDate" label="入账会计日期" prop="startDateM">
              <Col span="24">
                <DatePicker
                  class="date"
                  type="month"
                  :editable="false"
                  placeholder="选择入账会计日期"
                  v-model="formTop.startDateM"
                  @on-change="startTimeChange"
                  :options="startTimeOptions"
                ></DatePicker>
              </Col>
            </FormItem>
          </Col>
          <Col span="6" justify="start">
            <FormItem label="交易日期">
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="formTop.startDateS"
                  @on-change="startTimeChange1"
                  :options="startTimeOptions1"
                ></DatePicker>
              </Col>
              <Col span="2" class="text_c">
                <DatePicker type="date" placeholder="" v-model="formTop.date">-</DatePicker>
              </Col>
              <Col span="11">
                <DatePicker
                  type="date"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="formTop.endDateS"
                  @on-change="endTimeChange1"
                  :options="endTimeOptions1"
                ></DatePicker>
              </Col>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="资金流水号" prop="capitalFlowNumber">
              <Input clearable v-model="formTop.capitalFlowNumber"
                     :maxlength=50
                     placeholder="请输入"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="24" justify="start">
          <Col span="8" justify="end">
            <FormItem style="text-align: right">
              <Button type="primary" @click="searchPayment('formTop123')">查询</Button>
              <Button type="default" @click="requestPayment">重置</Button>
              <Button type="default" @click="slideDown">展开</Button>
            </FormItem>
          </Col>
          <Col span="8">
            &nbsp;&nbsp;
          </Col>
          <Col span="8">
            &nbsp;
          </Col>
        </Row>
      </Form>
    </div> -->
    <div class="dicTable" v-show="slideDownFlag">
      <form-items :formRows="formRows" refForm="formTopNew" ref="formTopNewParent" :formVal="formTop"
                  :rules="formTopValidateNew" label-position="top"/>
    </div>
  </div>
</template>
<script>
  let timer = null;
  let timerIn = null;
  //日期格式
  Date.prototype.format = function (format) {
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  }
  import {baseURL} from '../../util/axios'
  import {
    resetUserColnum,
    updateUserColnum,
    addressLikeList,
    getColumns,
    fetchCollection,
    fetchDataDic,
    fetchDataDic1,
    fetchMainName,
    fetchOurAcc,
    resultIn,
    getExportId,
    getpParteyTableId,
    getExportPath
  } from "../../api/receivables";  //api接口
  //权限
  import {
    getResourceButton,
  } from "../../api/resourceId"
  import {ArrNoRepeat} from '../../util/base'
  import {userFindList1} from "../../api/sysUser"
  import expandRow from './expandTable'; //二级表格
  import draggable from 'vuedraggable'  //拖拽盒子
  import add from './add' //新增
  import delEle from './delete' //删除
  import edit from './edit' //修改
  import recognitionm from './recognitionm' //批量认款
  import push from './push' //推送
  import thow from './thow' //推送
  import ster from './sterilisation' //推送
  import expandTable from './expandTable' //认款明细行
  import FormItemDatepicker from 'components/me/FormItemDatepicker'
  import FormItemInput from 'components/me/FormItemInput'
  import FormItemSelect from 'components/me/FormItemSelect'
  import FormItemBtns from 'components/me/FormItemBtns'
  import FormItems from 'components/me/FormItems'

  export default {
    name: "gather",
    components: {
      FormItems,
      FormItemInput,
      FormItemSelect,
      FormItemBtns,
      FormItemDatepicker,
      draggable,
      add,
      edit,
      delEle,
      recognitionm,
      push,
      thow,
      expandRow,
      ster,
      expandTable,
    },
    data() {
      const recognitionStateV = (rule, value, callback) => {
        if (!value && this.bankFlag1) {
          return callback(new Error('这是必填选项。'));
        } else {
          return callback();
        }
      };
      const startDateMV = (rule, value, callback) => {
        if (!value && this.bankFlag) {
          return callback(new Error('这是必填选项。'));
        } else {
          return callback();
        }
      };
      return {
        exportInModel: false,
        recognitionFlag: false,
        exportInModel1: false,
        rowList: {},
        admissionStateList: [],
        frozenStateList: [],
        confirmLock: '',
        minAccountTimeS: '',
        minExchangeTimeS: '',
        pushStateList: [],
        pushSystemList: [],
        revenueDirectionList: [],
        startTimeOptions: {},
        selectArr: {},
        endTimeOptions: {},
        startTimeOptions1: {},
        endTimeOptions1: {},
        startTimeOptions2: {},
        endTimeOptions2: {},
        eachOtherAccountNameList: [],
        eachOtherAccountList: [],
        delFlag: true,
        newRecogFlag: false,
        sterFlag: true,
        bankFlag: true,
        bankFlag1: true,
        delId: 0,
        editFlag: false,
        slideUpFlag: true,
        slideDownFlag: false,
        list: [],
        checkboxArr: [],
        totals: 0,
        page: 1,
        rows: 10,
        addressCodeData: [],
        a: "false",
        formTop: {},
        formTopValidateNew: {
          capitalFlowNumber: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        },
        formTopValidate: {
          recognitionState: [
            {validator: recognitionStateV, trigger: 'change'},
          ],
          startDateM: [
            {validator: startDateMV, trigger: 'change'},
          ],
        },
        columns1: [],
        pageX: 0,
        pageY: 0,
        flag: false,
        sort: '',
        order: '',
        data1: [],
        screenWidth: document.body.clientWidth,
        timer1: false,
        isLedger: false,
        addFlag: false, //新增
        recognitionFlag: true, //批量认款
        pushFlag: true, //推送
        pushBtnFlag: true, //推送
        thawBtnFlag: true, //解冻
        firstTable: true,//初始化页面首次加载列表标题
        numProgress: 0,
        progress: false,
        success: true,
        error: false,
        uploadUrl: '',
        exportInModel2: false,
        exportId: '',//导出
        requestCode: '',//导出
        requestName: '',//导出
        exportPath: '',//导出
        dowloadLine: false,
        percent: 50,
        addResourFlag: false,
        piliangFlag: false,
        importFlag: false,
        exportFlag: false,
        thawFlag: true,
        updateFlag: false,
        dailyFlag: false,
        cxFlag: false,
        deleteFlag: false,
        resultId: '',//上传文件id
        exportPathIn: '',//上传文件名
        requestCodeIn: '',//请求识别号
        disabledDownLoad: true,//下载按钮
        disabledResouce: true,//导入结果下载
        ids: [],//id数组
        checkboxList: [],//选择的id数组
      }
    },
    methods: {
      capitalOnChange(e) {
        console.log(333, e.target.value)
      },

      testDateChange(val) {
        console.log('test', val, 111, this.formTop.startDateC)
      },
      dblclick(rows, index) {
        this.newRecogFlag = true;
        this.rowList = rows;
        eventBus.$emit('newRecogFlag', this.newRecogFlag, rows);
        window.sessionStorage.setItem('financialSystemName', rows.financialSystemName);
        window.sessionStorage.setItem('reciprocalBankAccountName', rows.reciprocalBankAccountName)
      },
      founderChange(val) {
        // console.log(val);
      },
      //按钮权限
      fetResourceButton() {
        let data = {};
        getResourceButton(data)
          .then(res => {
            if (res.data.code == 200) {
              let data = res.data.data || [];
              if (data.length > 0) {
                data.forEach((item, index) => {
                  if (item.menuCode == 'pinsert') {
                    this.addResourFlag = true;
                  }
                  if (item.menuCode == 'piliangrenkuan') {
                    this.piliangFlag = true;
                  }
                  if (item.menuCode == 'pimport') {
                    this.importFlag = true;
                  }
                  if (item.menuCode == 'pexport') {
                    this.exportFlag = true;
                  }
                  if (item.menuCode == 'pupdate') {
                    this.updateFlag = true;
                  }
                  if (item.menuCode == 'pdelete') {
                    this.deleteFlag = true;
                  }
                  if (item.menuCode == 'pwriteOff') {
                    this.cxFlag = true;
                  }
                  if (item.menuCode == 'plogCapital') {
                    this.dailyFlag = true;
                  }
                })
              }
            }
          })
      },
      // 导入
      exportIn() {
        this.exportInModel = true;
        this.uploadUrl = baseURL + '/web/paymentProceeds/import'
      },
      // 导入摸板下载
      uploadModelIN(name) {
        if (name == 1) {
          let url = baseURL + '/web/paymentProceeds/importModel1'
          window.open(url)
        } else if (name == 2) {
          let url = baseURL + '/web/paymentProceeds/importModel2'
          window.open(url)
        } else {
          let url = baseURL + '/web/paymentProceeds/importModel3'
          window.open(url)
        }

      },
      // 上传成功
      successFun(res) {
        this.exportInModel = false;
        this.exportInModel1 = true;
        this.progress = true;
        this.success = false;
        this.error = false;
        if (res.code === 200) {
          this.numProgress = 20;
          this.resultId = res.data.id;
          this.requestCodeIn = res.data.requestCode;
          // this.exportPathIn = res.data.requestName + '结果';
          this.getDownFun();//导入请求完成方法
        }
      },
      //导入请求完成
      getDownFun() {
        let data = {
          id: this.resultId,
        }
        clearInterval(timerIn);
        timerIn = setInterval(() => {
          resultIn(data).then(res => {
            if (res.data.code === 200) {
              if (this.numProgress >= 85) {
                this.numProgress = 85;
              } else {
                this.numProgress += 5;
              }
              this.disabledResouce = false;
              if (res.data.data.state == 2) {
                this.progress = false;
                this.success = false;
                this.error = true;
                clearInterval(timerIn);
                timerIn = null;
                if (!res.data.data.resource) {
                  this.disabledResouce = true;
                  this.$Message.error('导入结果不可下载');
                } else {
                  this.disabledResouce = false;
                }
              }
              if (res.data.data.state == 3) {
                this.numProgress = 100;
                this.progress = false;
                this.success = true;
                this.error = false;
                clearInterval(timerIn);
                timerIn = null;
                if (!res.data.data.resource) {
                  this.disabledResouce = true;
                  this.$Message.error('导入结果不可下载');
                } else {
                  this.disabledResouce = false;
                }
              }
            } else {
              clearInterval(timerIn);
              timerIn = null;
            }
          })
            .catch(res => {
              clearInterval(timerIn);
              timerIn = null;
            })
        }, 1000)

      },
      //上传失败
      errorFun() {
        this.exportInModel = false;
        this.exportInModel1 = true;
        this.success = false;
        this.error = true;
      },
      //上传格式错误失败
      formatErrorFun() {
        this.exportInModel = false;
        this.exportInModel1 = true;
        this.success = false;
        this.error = true;
      },
      //上传时
      progressFun() {
      },
      //导入结果下载
      uploadResultIN() {
        let data = {
          id: this.resultId,
        };
        resultIn(data).then(res => {
          if (res.data.code === 200) {
            // let url = res.data.data.resource;
            // window.open(url);
            let resource = res.data.data.resource;
            let url = baseURL + '/web/common/export?path='
              + resource
              + '&filename=' + encodeURIComponent(this.requestCodeIn);
            window.open(url)
          }
        })
      },
      //导出
      exportOut() {
        this.loadPaymentProceedsList1();
      },
      //导出进行中
      exportOutIng() {
        this.dowloadLine = true;
        if (this.exportId) {
          let data = {
            id: this.exportId
          };
          clearInterval(timer);
          timer = setInterval(() => {
            getpParteyTableId(data)
              .then(res => {
                setTimeout(() => {
                  clearInterval(timer);
                  timer = null;
                }, 300000)
                if (res.data.code == 200) {
                  if (this.percent >= 85) {
                    this.percent = 85;
                  } else {
                    this.percent += 5;
                  }
                  if (res.data.data.state == 3) {
                    this.exportPath = res.data.data.resource;
                    this.percent = 100;
                    this.disabledDownLoad = false;
                    clearInterval(timer);
                    timer = null;
                  }
                  if (res.data.data.state == 2) {
                    this.disabledDownLoad = true;
                    this.dowloadLine = false;
                    this.$Message.error('导出失败');
                    clearInterval(timer);
                    timer = null;
                  }
                } else {
                  clearInterval(timer);
                  timer = null;
                }
              })
              .catch(e => {
                clearInterval(timer);
                timer = null;
              })
          }, 1000)
        }
      },
      //导出下载按钮
      exportOutDown() {
        var a = this.requestCode;
        let strAll = encodeURIComponent(a);
        let url = baseURL + '/web/common/export?path='
          + this.exportPath
          + '&filename='
          + strAll
        window.open(url)
        this.exportInModel2 = false;
      },
      //导出取消
      exportCancle() {
        this.exportInModel2 = false;
        clearInterval(timer);
        timer = null;
      },
      //前往下载
      downLoadQw() {
        let menus = JSON.parse(sessionStorage.getItem('menuList')).filter(value => {
          return value.resourceUrl == '/request';
        });
        window.sessionStorage.setItem('requestCode', this.requestCode);
        eventBus.$emit('changetab', '/request', menus[0], {requestCode: this.requestCode});
        this.exportInModel2 = false;
      },
      selectChange(val) {
        this.selectArr = val;
        if (val.length > 0) {
          this.pushBtnFlag = false;
          this.thawBtnFlag = false;
        } else {
          this.pushBtnFlag = true;
          this.thawBtnFlag = true;
        }
      },
      //手工推送
      pushFun() {
        if (this.selectArr.length > 0) {
          let frozenFlag = this.selectArr.every((item, index) => {
            return item.confirmLock == 2
          });
          let confirmFlag = this.selectArr.every((item, index) => {
            return item.confirmState != 3 || item.confirmState != 4
          });
          if (frozenFlag) {
            if (confirmFlag) {
              eventBus.$emit('pushFlag', true);
            } else {
              this.$Message.warning('所选数据包含已完全认款的数据，请重新选择！')
            }
          } else {
            this.$Message.warning('所选数据包含已冻结的数据，请重新选择！')
          }
        }
      },
      thawFun() {
        let frozenFlag = this.selectArr.every((item, index) => {
          return item.confirmLock == 1
        });
        if (frozenFlag) {
          this.$Message.warning('所选数据包含未冻结的数据，请重新选择！')
        } else {
          eventBus.$emit('thowFlag', true);
        }
      },
      //添加到this.ids
      pushIds(value) {
        var index = this.ids.indexOf(value);
        if (index < 0) {
          this.ids.push(value);
        }
      },
      //反选
      checkedRowCancel(selection, row) {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] == row.id) {
            this.ids.splice(i, 1);
          }
        }
      },
      //全部反选
      checkedAllRowCancel(selection) {
        this.checkboxList.forEach(value => {
          var index = this.ids.indexOf(value.id);
          if (index >= 0) {
            this.ids.splice(index, 1);
          }
        });
      },
      //单选
      checkedRow(selection, row) {
        this.checkboxList = selection;
        this.pushIds(row.id);
      },
      //多选
      checkedAllRow(selection) {
        this.checkboxList = selection;
        this.checkboxList.forEach(value => {
          this.pushIds(value.id);
        });
      },
      //增加一天
      addDate(time) {
        //加一天
        var timestamp = Date.parse(new Date(time));
        timestamp = timestamp / 1000;
        timestamp += 86400;
        //加一天
        var newTime = new Date(timestamp * 1000).format('yyyy-MM-dd');
        return newTime;
      },
      //排序
      sortChange(column) {
        this.sort = column.key;
        this.order = column.order;
        this.loadPaymentProceedsList();
      },
      //查询资金操作
      searchPayment(name) {
        console.log(name, '哈哈哈')
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.page = 1;
            this.ids = [];
            this.selectArr = [];
            this.loadPaymentProceedsList();
          }
        });
        this.$refs.formTop.validate((valid) => {
          if (valid) {
          }
        });
        this.$refs.formTop123.validate((valid) => {
          if (valid) {
          }
        })
      },
      searchPaymentUpdate() {
        this.$refs.formTop.validate((valid) => {
          if (valid) {
            this.page = 1;
            this.ids = [];
            this.selectArr = [];
            this.loadPaymentProceedsListUpdate();
          }
        });
        this.$refs.formTop123.validate((valid) => {
          if (valid) {
          }
        })
      },
      //加载资金流水列表数据
      loadPaymentProceedsList(page, rows) {
        let falg = false;
        let param = {};
        if (this.sort)
          param.sort = this.sort;
        if (this.order && this.order != 'normal') {
          param.order = this.order;
        }
        //创建日期
        if (this.formTop.startDateC) {
          falg = true;
          param.createBeginTime = new Date(this.formTop.startDateC).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateC) {
          falg = true;
          param.createEndTime = new Date(this.formTop.endDateC).Format('yyyy-MM-dd');
        }
        //入账会计日期
        if (this.formTop.startDateM) {
          falg = true;
          param.accountantTime = this.formTop.startDateM ? new Date(this.formTop.startDateM).Format('yyyy-MM') : '';
        }
        // if (this.formTop.endDateM) {
        //   falg = true;
        //   // param.accountantEndTime = new Date(this.formTop.endDateM).Format('yyyy-MM-dd');
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        //交易日期
        if (this.formTop.startDateS) {
          falg = true;
          param.exchangeBeginTime = new Date(this.formTop.startDateS).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateS) {
          falg = true;
          param.exchangeEndTime = new Date(this.formTop.endDateS).Format('yyyy-MM-dd');
        }
        // //逻辑设置结束日期
        // if (this.formTop.endDateM) {
        //   // param.accountantEndTime = this.addDate(new Date(this.formTop.endDateM).Format('yyyy-MM-dd'));
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        if (this.formTop.endDateS) {
          param.exchangeEndTime = this.addDate(new Date(this.formTop.endDateS).Format('yyyy-MM-dd'));
        }
        if (this.formTop.endDateC) {
          param.createEndTime = this.addDate(new Date(this.formTop.endDateC).Format('yyyy-MM-dd'));
        }
        //资金流水号
        if (this.formTop.capitalFlowNumber && this.formTop.capitalFlowNumber.trim()) {
          falg = true;
          param.paymentWaterCode = this.formTop.capitalFlowNumber ? this.formTop.capitalFlowNumber.trim() : '';
        }
        //收款单号
        if (this.formTop.receiptNumber && this.formTop.receiptNumber.trim()) {
          falg = true;
          param.proceedsCode = this.formTop.receiptNumber ? this.formTop.receiptNumber.trim() : '';
        }
        //来源
        if (this.formTop.state) {
          falg = true;
          param.sourceCode = this.formTop.state;
        }
        //金融机构分类
        if (this.formTop.accountType && this.formTop.accountType.length > 0) {
          falg = true;
          param.accountTypeCodes = this.formTop.accountType.join(",");
        }
        //核算主体名称
        if (this.formTop.accountingSubjectName && this.formTop.accountingSubjectName.length > 0) {
          falg = true;
          param.financialSystemCodes = this.formTop.accountingSubjectName.join(",");
        }
        //款项类型
        if (this.formTop.typeOfMoney && this.formTop.typeOfMoney.length > 0) {
          falg = true;
          param.paymentTypeCodes = this.formTop.typeOfMoney.join(",");
        }
        //交易币
        if (this.formTop.traadingCurrency && this.formTop.traadingCurrency.length > 0) {
          falg = true;
          param.exchangeCurrencyCodes = this.formTop.traadingCurrency.join(",");
        }
        //业务线
        if (this.formTop.businessLine && this.formTop.businessLine.length > 0) {
          falg = true;
          param.serviceLineCodes = this.formTop.businessLine.join(",");
        }
        //我方账号
        if (this.formTop.ourAccount && this.formTop.ourAccount.length > 0) {
          falg = true;
          param.nostroBankAccountNumbers = this.formTop.ourAccount.join(",");
        }
        //对方账户名
        if (this.formTop.eachOtherAccountName && this.formTop.eachOtherAccountName.trim()) {
          falg = true;
          param.reciprocalBankAccountName = this.formTop.eachOtherAccountName ? this.formTop.eachOtherAccountName.trim() : '';
        }
        //商品名称
        if (this.formTop.commodityName && this.formTop.commodityName.trim()) {
          falg = true;
          param.productName = this.formTop.commodityName ? this.formTop.commodityName.trim() : '';
        }
        //本位币
        if (this.formTop.standardCurrency && this.formTop.standardCurrency.length > 0) {
          falg = true;
          param.nostroCurrencyCodes = this.formTop.standardCurrency.join(",");
        }
        //认款状态
        if (this.formTop.recognitionState) {
          falg = true;
          param.confirmState = this.formTop.recognitionState;
        }
        //冲销状态
        if (this.formTop.writeOffState) {
          falg = true;
          param.chargeAgainstState = this.formTop.writeOffState;
        }
        //对方账号
        if (this.formTop.eachOtherAccount && this.formTop.eachOtherAccount.trim()) {
          falg = true;
          param.reciprocalBankAccountNumber = this.formTop.eachOtherAccount ? this.formTop.eachOtherAccount.trim() : '';
        }
        if (this.formTop.pushState) {
          falg = true;
          param.enterCeState = this.formTop.pushState;
        }
        if (this.formTop.summaryProceedsCode && this.formTop.summaryProceedsCode.trim()) {
          falg = true;
          param.summaryProceedsCode = this.formTop.summaryProceedsCode ? this.formTop.summaryProceedsCode.trim() : '';
        }
        //创建人
        if (this.formTop.founder) {
          falg = true;
          param.createBy = this.formTop.founder;
        } else if (this.formTop.founder === 0) {
          falg = true;
          param.createBy = this.formTop.founder;
        }
        //摘要
        if (this.formTop.remark && this.formTop.remark.trim()) {
          falg = true;
          param.degestComment = this.formTop.remark ? this.formTop.remark.trim() : '';
          if (this.formTop.remark.length > 200) {
            this.$Message.warning("摘要字数不能超过200");
            return false;
          }
        }
        //入账状态
        if (this.formTop.admissionState) {
          falg = true;
          param.enterAccountsState = this.formTop.admissionState;
        }
        param.page = this.page;
        param.rows = this.rows;
        if (falg) {
          fetchCollection(param).then(res => {
            this.loadFlag = true;
            if (res.status == 200 && res.data.code == 200) {
              res = res.data;
              this.totals = res.data.totalCount || 0;
              this.data1 = res.data.records ? res.data.records : [];
              window.sessionStorage.setItem('proceedsCode', '');

              //勾选
              //设置当前页选中值为空
              this.checkboxList = [];
              let roleList = this.data1;
              for (var i = 0; i < roleList.length; i++) {
                if (roleList[i].checkd == true) {
                  roleList[i]._checked = true;
                  this.pushIds(roleList[i].id);
                }
              }
              for (let j = 0; j < this.ids.length; j++) {
                for (let i = 0; i < this.data1.length; i++) {
                  if (this.ids[j] == this.data1[i].id) {
                    this.$set(this.data1[i], '_checked', true);
                    //设置当前页的选中值
                    this.checkboxList.push(this.data1[i]);
                  }
                }
              }
            }
          }).catch(res => {
            this.loadFlag = true;
          });
          this.slideUp();
        } else {
          if (page)
            this.page = page;
          if (rows)
            this.rows = rows;
          this.$Message.warning('请选择入帐会计日期或者认款状态进行查询！');
        }
      },
      loadPaymentProceedsListUpdate(page, rows) {
        let falg = false;
        let param = {};
        if (this.sort)
          param.sort = this.sort;
        if (this.order && this.order != 'normal') {
          param.order = this.order;
        }

        //创建日期
        if (this.formTop.startDateC) {
          falg = true;
          param.createBeginTime = new Date(this.formTop.startDateC).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateC) {
          falg = true;
          param.createEndTime = new Date(this.formTop.endDateC).Format('yyyy-MM-dd');
        }
        //入账会计日期
        if (this.formTop.startDateM) {
          falg = true;
          param.accountantTime = this.formTop.startDateM ? new Date(this.formTop.startDateM).Format('yyyy-MM') : '';
        }
        // if (this.formTop.endDateM) {
        //   falg = true;
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        //交易日期
        if (this.formTop.startDateS) {
          falg = true;
          param.exchangeBeginTime = new Date(this.formTop.startDateS).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateS) {
          falg = true;
          param.exchangeEndTime = new Date(this.formTop.endDateS).Format('yyyy-MM-dd');
        }
        // //逻辑设置结束日期
        // if (this.formTop.endDateM) {
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        if (this.formTop.endDateS) {
          param.exchangeEndTime = this.addDate(new Date(this.formTop.endDateS).Format('yyyy-MM-dd'));
        }
        if (this.formTop.endDateC) {
          param.createEndTime = this.addDate(new Date(this.formTop.endDateC).Format('yyyy-MM-dd'));
        }
        //资金流水号
        if (this.formTop.capitalFlowNumber && this.formTop.capitalFlowNumber.trim()) {
          falg = true;
          param.paymentWaterCode = this.formTop.capitalFlowNumber ? this.formTop.capitalFlowNumber.trim() : '';
        }
        //收款单号
        if (this.formTop.receiptNumber && this.formTop.receiptNumber.trim()) {
          falg = true;
          param.proceedsCode = this.formTop.receiptNumber ? this.formTop.receiptNumber.trim() : '';
        }
        //来源
        if (this.formTop.state) {
          falg = true;
          param.sourceCode = this.formTop.state;
        }
        //金融机构分类
        if (this.formTop.accountType && this.formTop.accountType.length > 0) {
          falg = true;
          param.accountTypeCodes = this.formTop.accountType.join(",");
        }
        //核算主体名称
        if (this.formTop.accountingSubjectName && this.formTop.accountingSubjectName.length > 0) {
          falg = true;
          param.financialSystemCodes = this.formTop.accountingSubjectName.join(",");
        }
        //款项类型
        if (this.formTop.typeOfMoney && this.formTop.typeOfMoney.length > 0) {
          falg = true;
          param.paymentTypeCodes = this.formTop.typeOfMoney.join(",");
        }
        //交易币
        if (this.formTop.traadingCurrency && this.formTop.traadingCurrency.length > 0) {
          falg = true;
          param.exchangeCurrencyCodes = this.formTop.traadingCurrency.join(",");
        }
        //业务线
        if (this.formTop.businessLine && this.formTop.businessLine.length > 0) {
          falg = true;
          param.serviceLineCodes = this.formTop.businessLine.join(",");
        }
        //我方账号
        if (this.formTop.ourAccount && this.formTop.ourAccount.length > 0) {
          falg = true;
          param.nostroBankAccountNumbers = this.formTop.ourAccount.join(",");
        }
        //对方账户名
        if (this.formTop.eachOtherAccountName && this.formTop.eachOtherAccountName.trim()) {
          falg = true;
          param.reciprocalBankAccountName = this.formTop.eachOtherAccountName ? this.formTop.eachOtherAccountName.trim() : '';
        }
        //商品名称
        if (this.formTop.commodityName && this.formTop.commodityName.trim()) {
          falg = true;
          param.productName = this.formTop.commodityName ? this.formTop.commodityName.trim() : '';
        }
        //本位币
        if (this.formTop.standardCurrency && this.formTop.standardCurrency.length > 0) {
          falg = true;
          param.nostroCurrencyCodes = this.formTop.standardCurrency.join(",");
        }
        //认款状态
        if (this.formTop.recognitionState) {
          falg = true;
          param.confirmState = this.formTop.recognitionState;
        }
        //冲销状态
        if (this.formTop.writeOffState) {
          falg = true;
          param.chargeAgainstState = this.formTop.writeOffState;
        }
        //对方账号
        if (this.formTop.eachOtherAccount && this.formTop.eachOtherAccount.trim()) {
          falg = true;
          param.reciprocalBankAccountNumber = this.formTop.eachOtherAccount ? this.formTop.eachOtherAccount.trim() : '';
        }
        //创建人
        if (this.formTop.founder) {
          falg = true;
          param.createBy = this.formTop.founder;
        } else if (this.formTop.founder === 0) {
          falg = true;
          param.createBy = this.formTop.founder;
        }
        //摘要
        if (this.formTop.remark && this.formTop.remark.trim()) {
          falg = true;
          param.degestComment = this.formTop.remark ? this.formTop.remark.trim() : '';
          if (this.formTop.remark.length > 200) {
            this.$Message.warning("摘要字数不能超过200");
            return false;
          }
        }
        //入账状态
        if (this.formTop.admissionState) {
          falg = true;
          param.enterAccountsState = this.formTop.admissionState;
        }
        param.page = this.page;
        param.rows = this.rows;
        if (falg) {
          fetchCollection(param).then(res => {
            this.loadFlag = true;
            if (res.status == 200 && res.data.code == 200) {
              res = res.data;
              this.totals = res.data.totalCount || 0;
              this.data1 = res.data.records ? res.data.records : [];
              window.sessionStorage.setItem('proceedsCode', '');

              //勾选
              //设置当前页选中值为空
              this.checkboxList = [];
              let roleList = this.data1;
              for (var i = 0; i < roleList.length; i++) {
                if (roleList[i].checkd == true) {
                  roleList[i]._checked = true;
                  this.pushIds(roleList[i].id);
                }
              }
              for (let j = 0; j < this.ids.length; j++) {
                for (let i = 0; i < this.data1.length; i++) {
                  if (this.ids[j] == this.data1[i].id) {
                    this.$set(this.data1[i], '_checked', true);
                    //设置当前页的选中值
                    this.checkboxList.push(this.data1[i]);
                  }
                }
              }
            }
          }).catch(res => {
            this.loadFlag = true;
          });
          this.slideUp();
        } else {
          // if (page)
          //   this.page = page;
          // if (rows)
          //   this.rows = rows;
          // this.$Message.warning('请至少选择一个条件进行检索！');
        }
      },
      loadPaymentProceedsList1(page, rows) {
        let falg = false;
        let param = {};
        if (this.sort)
          param.esSort = this.sort;
        if (this.order)
          param.order = this.order;
        //创建日期
        if (this.formTop.startDateC) {
          falg = true;
          param.createBeginTime = new Date(this.formTop.startDateC).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateC) {
          falg = true;
          param.createEndTime = new Date(this.formTop.endDateC).Format('yyyy-MM-dd');
        }
        //入账会计日期
        if (this.formTop.startDateM) {
          falg = true;
          param.accountantTime = this.formTop.startDateM ? new Date(this.formTop.startDateM).Format('yyyy-MM') : '';
        }
        // if (this.formTop.endDateM) {
        //   falg = true;
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        //交易日期
        if (this.formTop.startDateS) {
          falg = true;
          param.exchangeBeginTime = new Date(this.formTop.startDateS).Format('yyyy-MM-dd');
        }
        if (this.formTop.endDateS) {
          falg = true;
          param.exchangeEndTime = new Date(this.formTop.endDateS).Format('yyyy-MM-dd');
        }
        // //逻辑设置结束日期
        // if (this.formTop.endDateM) {
        //   param.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
        // }
        if (this.formTop.endDateS) {
          falg = true;
          param.exchangeEndTime = this.addDate(new Date(this.formTop.endDateS).Format('yyyy-MM-dd'));
        }
        if (this.formTop.endDateC) {
          falg = true;
          param.createEndTime = this.addDate(new Date(this.formTop.endDateC).Format('yyyy-MM-dd'));
        }
        //资金流水号
        if (this.formTop.capitalFlowNumber && this.formTop.capitalFlowNumber.trim()) {
          falg = true;
          param.paymentWaterCode = this.formTop.capitalFlowNumber ? this.formTop.capitalFlowNumber.trim() : '';
        }
        //收款单号
        if (this.formTop.receiptNumber && this.formTop.receiptNumber.trim()) {
          falg = true;
          param.proceedsCode = this.formTop.receiptNumber ? this.formTop.receiptNumber.trim() : '';
        }
        //来源
        if (this.formTop.state) {
          falg = true;
          param.sourceCode = this.formTop.state;
        }
        //金融机构分类
        if (this.formTop.accountType && this.formTop.accountType.length > 0) {
          falg = true;
          param.accountTypeCodes = this.formTop.accountType.join(",");
        }
        //核算主体名称
        if (this.formTop.accountingSubjectName && this.formTop.accountingSubjectName.length > 0) {
          falg = true;
          param.financialSystemCodes = this.formTop.accountingSubjectName.join(",");
        }
        //款项类型
        if (this.formTop.typeOfMoney && this.formTop.typeOfMoney.length > 0) {
          falg = true;
          param.paymentTypeCodes = this.formTop.typeOfMoney.join(",");
        }
        //交易币
        if (this.formTop.traadingCurrency && this.formTop.traadingCurrency.length > 0) {
          falg = true;
          param.exchangeCurrencyCodes = this.formTop.traadingCurrency.join(",");
        }
        //业务线
        if (this.formTop.businessLine && this.formTop.businessLine.length > 0) {
          falg = true;
          param.serviceLineCodes = this.formTop.businessLine.join(",");
        }
        //我方账号
        if (this.formTop.ourAccount && this.formTop.ourAccount.length > 0) {
          falg = true;
          param.nostroBankAccountNumbers = this.formTop.ourAccount.join(",");
        }
        //对方账户名
        if (this.formTop.eachOtherAccountName && this.formTop.eachOtherAccountName.trim()) {
          falg = true;
          param.reciprocalBankAccountName = this.formTop.eachOtherAccountName ? this.formTop.eachOtherAccountName.trim() : '';
        }
        //商品名称
        if (this.formTop.commodityName && this.formTop.commodityName.trim()) {
          falg = true;
          param.productName = this.formTop.commodityName ? this.formTop.commodityName.trim() : '';
        }
        //本位币
        if (this.formTop.standardCurrency && this.formTop.standardCurrency.length > 0) {
          falg = true;
          param.nostroCurrencyCodes = this.formTop.standardCurrency.join(",");
        }
        //认款状态
        if (this.formTop.recognitionState) {
          falg = true;
          param.confirmState = this.formTop.recognitionState;
        }
        //冲销状态
        if (this.formTop.writeOffState) {
          falg = true;
          param.chargeAgainstState = this.formTop.writeOffState;
        }
        //对方账号
        if (this.formTop.eachOtherAccount && this.formTop.eachOtherAccount.trim()) {
          falg = true;
          param.reciprocalBankAccountNumber = this.formTop.eachOtherAccount ? this.formTop.eachOtherAccount.trim() : '';
        }
        //创建人
        if (this.formTop.founder) {
          falg = true;
          param.createBy = this.formTop.founder;
        } else if (this.formTop.founder == 0) {
          param.createBy = this.formTop.founder;
        }
        //摘要
        if (this.formTop.remark && this.formTop.remark.trim()) {
          falg = true;
          param.degestComment = this.formTop.remark ? this.formTop.remark.trim() : '';
          if (this.formTop.remark.length > 200) {
            this.$Message.warning("摘要字数不能超过200");
            return false;
          }
        }
        //入账状态
        if (this.formTop.admissionState) {
          falg = true;
          param.enterAccountsState = this.formTop.admissionState;
        }
        param.page = this.page;
        param.rows = this.rows;
        if (falg) {
          this.slideUp();
          this.dowloadLine = true;
          this.exportInModel2 = true;
          this.disabledDownLoad = true;
          this.percent = 5;
          let data = {};
          if (this.formTop.startDateS) {
            data.exchangeBeginTime = new Date(this.formTop.startDateS).Format('yyyy-MM-dd');
          }
          if (this.formTop.endDateS) {
            data.exchangeEndTime = this.addDate(new Date(this.formTop.endDateS).Format('yyyy-MM-dd'));
          }
          if (this.formTop.startDateM) {
            data.accountantTime = this.formTop.startDateM ? new Date(this.formTop.startDateM).Format('yyyy-MM') : '';
          }
          // if (this.formTop.endDateM) {
          //   data.accountantEndTime = new Date(this.formTop.startDateM).Format('yyyy-MM');
          // }
          if (this.formTop.startDateC) {
            data.createBeginTime = new Date(this.formTop.startDateC).Format('yyyy-MM-dd')
          }
          if (this.formTop.endDateC) {
            data.createEndTime = this.addDate(new Date(this.formTop.endDateC).Format('yyyy-MM-dd'))
          }
          if (this.formTop.receiptNumber) {
            data.proceedsCode = this.formTop.receiptNumber
          }
          if (this.formTop.state) {
            data.sourceCode = this.formTop.state
          }
          if (this.formTop.capitalFlowNumber) {
            data.paymentWaterCode = this.formTop.capitalFlowNumber
          }
          if (this.formTop.typeOfMoney && this.formTop.typeOfMoney.length > 0) {
            data.paymentTypeCodes = this.formTop.typeOfMoney.join(',')
          }
          if (this.formTop.accountingSubjectName && this.formTop.accountingSubjectName.length > 0) {
            data.financialSystemCodes = this.formTop.accountingSubjectName.join(",")
          }
          if (this.formTop.accountType && this.formTop.accountType.length > 0) {
            data.accountTypeCodes = this.formTop.accountType.join(",")
          }
          if (this.formTop.ourAccount && this.formTop.ourAccount.length > 0) {
            data.nostroBankAccountNumbers = this.formTop.ourAccount.join(",")
          }
          if (this.formTop.businessLine && this.formTop.businessLine.length > 0) {
            data.serviceLineCodes = this.formTop.businessLine.join(",")
          }
          if (this.formTop.traadingCurrency && this.formTop.traadingCurrency.length > 0) {
            data.exchangeCurrencyCodes = this.formTop.businessLine.join(",")
          }
          if (this.formTop.standardCurrency && this.formTop.standardCurrency.length > 0) {
            data.nostroCurrencyCodes = this.formTop.standardCurrency.join(',')
          }
          if (this.formTop.commodityName) {
            data.productName = this.formTop.commodityName
          }
          if (this.formTop.eachOtherAccountName) {
            data.reciprocalBankAccountName = this.formTop.eachOtherAccountName
          }
          if (this.formTop.eachOtherAccount) {
            data.reciprocalBankAccountNumber = this.formTop.eachOtherAccount
          }
          if (this.formTop.writeOffState) {
            data.chargeAgainstState = this.formTop.writeOffState
          }
          if (this.formTop.recognitionState) {
            data.confirmState = this.formTop.recognitionState
          }
          if (this.formTop.admissionState) {
            data.enterAccountsState = this.formTop.admissionState
          }
          if (this.formTop.remark) {
            data.degestComment = this.formTop.remark
          }
          if (this.formTop.founder) {
            data.createBy = this.formTop.founder
          }
          if (this.ids && this.ids.length > 0) {
            data.ids = this.ids.join(',')
          }

          getExportId(data)
            .then(res => {
              if (res.data.code == 200) {
                this.exportId = res.data.data.id;
                this.requestCode = res.data.data.requestCode;
                this.requestName = res.data.data.requestName;
                this.exportOutIng();
              }
            })
        } else {
          if (page)
            this.page = page;
          if (rows)
            this.rows = rows;
          this.$Message.warning('无任何导出数据！');
        }
      },
      //点击导出查询条件
      //重置查询
      requestPayment() {
        this.loadFirstFormTop();
      },
      loadTitleSetting() {
        var obj = {
          key: 'right',
          width: 40,
          renderHeader: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-settings'
                },
                style: {
                  position: 'relative',
                  cursor: 'pointer'
                },
                on: {
                  click: (e) => {
                    e.stopPropagation();
                    this.flag = !this.flag;
                    this.pageX = e.pageX;
                    this.pageY = e.pageY;
                  }
                },
              })
            ], {
              style: {
                cursor: 'pointer'
              },
            })
          },
        };
        this.columns1.push(obj);
      },
      //资金流水表头初始化值
      loadFirstTitle() {
        this.columns1 = [
          {
            type: 'selection',
            align: 'center',
            title: '全选',
            key: 'sel',
            width: 25,
            // fixed: 'left'
          },
          {
            title: '操作',
            key: 'caoZuo',
            width: 60,
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    placement: 'bottom',
                    title: '',
                    content: 'content',
                    transfer: true,
                    trigger: 'hover',
                    wordWrap: true,
                    zIndex: 5,
                  },
                  style: {
                    padding: 0,
                    zIndex: 5,
                    position: 'relative'
                  },
                }, [
                  h('Icon', {
                    props: {
                      type: 'md-more',
                    },
                    style: {
                      cursor: "pointer",
                      marginRight: '20px',
                    },
                    on: {
                      click: () => {
                        // this.menuEditModel = true;
                      }
                    }
                  }),
                  h('ul', {
                    slot: 'content',
                    style: {
                      color: '#333',
                      zIndex: 5
                    },
                  }, [
                    h('li', {
                      style: {
                        cursor: "pointer",
                      },
                      on: {
                        click: () => {
                          this.newRecogFlag = true;
                          this.rowList = params.row;
                          eventBus.$emit('newRecogFlag', this.newRecogFlag, params.row);
                          window.sessionStorage.setItem('financialSystemName', params.row.financialSystemName);
                          window.sessionStorage.setItem('reciprocalBankAccountName', params.row.reciprocalBankAccountName)
                        }
                      }
                    }, [
                      h('Icon', {
                        props: {
                          type: 'md-xq',
                        },
                        style: {
                          cursor: "pointer",
                        },
                        on: {
                          click: () => {
                            this.newRecogFlag = true;
                            this.rowList = params.row;
                            eventBus.$emit('newRecogFlag', this.newRecogFlag, params.row);
                            window.sessionStorage.setItem('financialSystemName', params.row.financialSystemName);
                            window.sessionStorage.setItem('reciprocalBankAccountName', params.row.reciprocalBankAccountName)
                          }
                        }
                      }),
                      h('span', {
                        slot: 'content',
                        style: {
                          color: '#333',
                        },
                      }, '查看'),
                    ]),
                    h('li', {
                      style: {
                        cursor: "pointer",
                        display: this.updateFlag ? 'block' : 'none'
                      },
                      on: {
                        click: () => {
                          if (params.row.sourceCode != 'artifical') {
                            this.$Message.warning('数据来源于' + params.row.sourceName + '不允许编辑！');
                            return;
                          } else {
                            if (params.row.confirmState == '4' && params.row.enterAccountsState == '3') {
                              this.editFlag = true;
                              eventBus.$emit('edit', this.editFlag, params.row);
                              return;
                            }
                          }
                          if (params.row.chargeAgainstState == 2) {
                            this.$Message.warning('数据已被冲销，不允许编辑！');
                            return;
                          }
                          if (params.row.enterAccountsState != 1 || params.row.confirmState != 1) {
                            this.$Message.warning('数据已进行后续处理，不允许编辑！');
                            return;
                          }
                          this.editFlag = true;
                          eventBus.$emit('edit', this.editFlag, params.row)
                        }
                      }
                    }, [
                      h('Icon', {
                        props: {
                          type: 'editBtn',
                        },
                        style: {
                          cursor: "pointer",
                        },
                        on: {
                          click: () => {
                            if (params.row.sourceCode != 'artifical') {
                              this.$Message.warning('数据来源于' + params.row.sourceName + '不允许编辑！');
                              return;
                            } else {
                              if (params.row.confirmState == '4' && params.row.enterAccountsState == '3') {
                                this.editFlag = true;
                                eventBus.$emit('edit', this.editFlag, params.row);
                                return;
                              }
                            }
                            if (params.row.chargeAgainstState == 2) {
                              this.$Message.warning('数据已被冲销，不允许编辑！');
                              return;
                            }
                            if (params.row.enterAccountsState != 1 && params.row.confirmState != 1) {
                              this.$Message.warning('数据已进行后续处理，不允许编辑！');
                              return;
                            }
                            this.editFlag = true;
                            eventBus.$emit('edit', this.editFlag, params.row)
                          }
                        }
                      }),
                      h('span', {
                        slot: 'content',
                        style: {
                          color: '#333',
                        },
                      }, '编辑'),
                    ]),
                    h('li', {
                      style: {
                        cursor: "pointer",
                        display: this.deleteFlag ? 'block' : 'none'
                      },
                      on: {
                        click: () => {
                          if (params.row.sourceCode != 'artifical') {
                            this.$Message.warning('数据来源于' + params.row.sourceName + '不允许删除！');
                            return;
                          } else {
                            if (params.row.confirmState == '4' && params.row.enterAccountsState == '3') {
                              this.delFlag = true;
                              let data = {
                                delFlag: true,
                                id: params.row.id
                              };
                              this.delId = Number(params.row.id);
                              eventBus.$emit('delete', data);
                              return;
                            }
                          }
                          if (params.row.chargeAgainstState == 2) {
                            this.$Message.warning('数据已被冲销，不允许删除！');
                            return;
                          }
                          if (params.row.enterAccountsState == 1 && params.row.confirmState == 1) {

                          } else {
                            this.$Message.warning('数据已进行后续处理，不允许删除！');
                            return;
                          }
                          this.delFlag = true;
                          let data = {
                            delFlag: true,
                            id: params.row.id
                          };
                          this.delId = Number(params.row.id);
                          eventBus.$emit('delete', data)
                        }
                      }
                    }, [
                      h('Icon', {
                        props: {
                          type: 'ios-trash-outline',
                        },
                        style: {
                          cursor: "pointer",
                        },
                        on: {
                          click: () => {
                            if (params.row.sourceCode != 'artifical') {
                              this.$Message.warning('数据来源于' + params.row.sourceName + '不允许删除！');
                              return;
                            } else {
                              if (params.row.confirmState == '4' && params.row.enterAccountsState == '3') {
                                this.delFlag = true;
                                let data = {
                                  delFlag: true,
                                  id: params.row.id
                                };
                                this.delId = Number(params.row.id);
                                eventBus.$emit('delete', data);
                                return;
                              }
                            }
                            if (params.row.chargeAgainstState == 2) {
                              this.$Message.warning('数据已被冲销，不允许删除！');
                              return;
                            }
                            if (params.row.enterAccountsState == 2 && params.row.confirmState != 1) {
                              this.$Message.warning('数据已进行后续处理，不允许删除！');
                              return;
                            }
                            this.delFlag = true;
                            let data = {
                              delFlag: true,
                              id: params.row.id
                            };
                            this.delId = Number(params.row.id);
                            eventBus.$emit('delete', data)
                          }
                        }
                      }),
                      h('span', {
                        slot: 'content',
                        style: {
                          color: '#333',
                        },
                      }, '删除'),
                    ]),

                    // h('li', {
                    //   style: {
                    //     cursor: "pointer",
                    //     display: this.cxFlag ? 'block' : 'none'
                    //   },
                    //   on: {
                    //     click: () => {
                    //       if (params.row.sourceCode != 'artifical') {
                    //         this.$Message.warning('数据来源于' + params.row.sourceName + '不允许冲销！');
                    //         return;
                    //       }
                    //       if (params.row.chargeAgainstState == 2) {
                    //         this.$Message.warning('已冲销数据不允许再次冲销！');
                    //         return;
                    //       }
                    //       if (params.row.confirmState != 1) {
                    //         this.$Message.warning('数据已进行后续处理，不允许冲销！');
                    //         return;
                    //       }
                    //       if (params.row.enterAccountsState == 1) {
                    //         this.$Message.warning('数据处于未入账状态，可直接删除！');
                    //         return;
                    //       }
                    //       let data = {
                    //         slsFlag: true,
                    //         id: params.row.id
                    //       };
                    //       this.sterFlag = true;
                    //       eventBus.$emit('slsModal', data)
                    //     }
                    //   }
                    // }, [
                    //   h('Icon', {
                    //     props: {
                    //       type: 'md-cx',
                    //     },
                    //     style: {
                    //       cursor: "pointer",
                    //     },
                    //     on: {
                    //       click: () => {
                    //         if (params.row.sourceCode != 'artifical') {
                    //           this.$Message.warning('数据来源于' + params.row.sourceName + '不允许冲销！');
                    //           return;
                    //         }
                    //         if (params.row.chargeAgainstState == 2) {
                    //           this.$Message.warning('已冲销数据不允许再次冲销！');
                    //           return;
                    //         }
                    //         if (params.row.enterAccountsState == 1) {
                    //           this.$Message.warning('数据处于未入账状态，不允许冲销！');
                    //           return;
                    //         }
                    //         if (params.row.confirmState != 1) {
                    //           this.$Message.warning('数据已进行后续处理，不允许冲销！');
                    //           return;
                    //         }
                    //         let data = {
                    //           slsFlag: true,
                    //           id: params.row.id
                    //         };
                    //         this.sterFlag = true;
                    //         eventBus.$emit('slsModal', data)
                    //       }
                    //     }
                    //   }),
                    //   h('span', {
                    //     slot: 'content',
                    //     style: {
                    //       color: '#333',
                    //     },
                    //   }, '冲销'),
                    // ]),
                    h('li', {
                      style: {
                        cursor: "pointer",
                        display: this.dailyFlag ? 'block' : 'none'
                      },
                      on: {
                        click: () => {
                          let menus = JSON.parse(sessionStorage.getItem('menuList')).filter(value => {
                            return value.resourceUrl == '/daily';
                          });
                          window.sessionStorage.setItem('proceedsCode', params.row.proceedsCode);
                          window.sessionStorage.setItem('proceedsCodeRecogFlag', false);
                          eventBus.$emit('changetab', '/daily', menus[0], {proceedsCode: params.row.proceedsCode})
                        }
                      }
                    }, [
                      h('Icon', {
                        props: {
                          type: 'md-log',
                        },
                        style: {
                          cursor: "pointer",
                        },
                        on: {
                          click: () => {
                            let menus = JSON.parse(sessionStorage.getItem('menuList')).filter(value => {
                              return value.resourceUrl == '/daily';
                            });
                            window.sessionStorage.setItem('proceedsCodeRecogFlag', false);
                            eventBus.$emit('changetab', '/daily', menus[0], {proceedsCode: params.row.proceedsCode})
                          }
                        }
                      }),
                      h('span', {
                        slot: 'content',
                        style: {
                          color: '#333',
                        },
                      }, '日志'),
                    ]),
                  ]),
                ]),
              ]);
            }
          },
          {
            type: 'index',
            title: '序号',
            key: 'index',
            align: 'center',
            width: 60,
            // fixed: 'left'
          },
        ]
      },
      loadFirstFormTop() {
        this.formTop = {
          menuAddress: '',
          endDateS: '',
          startDateS: '',
          endDateM: '',
          startDateM: '',
          startDateC: '',
          endDateC: '',
          state: '',
          source: '',
          receiptNumber: '',
          capitalFlowNumber: '',
          typeOfMoney: '',
          accountingSubjectName: '',
          accountType: '',
          ourAccount: '',
          outAccountList: [],
          businessLine: '',
          businessLineList: [],
          traadingCurrency: '',
          traadingCurrencyList: [],
          standardCurrency: '',
          standardCurrencyList: [],
          commodityName: '',
          eachOtherAccountName: '',
          eachOtherAccount: '',
          writeOffState: '',
          writeOffStateList: this.formTop.writeOffStateList,
          recognitionState: '1',
          recognitionStateList: this.formTop.recognitionStateList,
          admissionState: '',
          admissionStateList: this.admissionStateList,
          remark: '',
          founder: '',
          sourceList: [],
          paymentList: [],
          accountList: [],
          mainNameList: [],
          founderList: [],
        };
      },
      //加载数据字典数据（公用）
      async loadDataDic(dicClassCode) {
        if (dicClassCode == 'service_line_code') {
          let param = {businessCode: ''};
          await fetchDataDic1(param).then(res => {
            if (res.status == 200) {
              res = res.data;
              if (res.code == 200) {
                this.handleDataDic(res.data ? res.data : [], dicClassCode);
              }
            }
          })
        } else {
          let param = {dicClassCode: dicClassCode};
          await fetchDataDic(param).then(res => {
            if (res.status == 200) {
              res = res.data;
              if (res.code == 200) {
                this.handleDataDic(res.data ? res.data : [], dicClassCode);
              }
            }
          })
        }
      },
      handleDataDic(list, dicClassCode) {
        switch (dicClassCode) {
          case 'source_code':
            this.formTop.sourceList = list;
            break;
          case 'payment_type_code':
            this.formTop.paymentList = list;
            break;
          case 'financial_institutions_code':
            this.formTop.accountList = list;
            break;
          case 'service_line_code':
            this.formTop.businessLineList = list;
            break;
          case 'recognition_state_code':
            this.formTop.recognitionStateList = list;
            break;
          case 'writeOff_state_code':
            this.formTop.writeOffStateList = list;
            break;
          case 'admission_state_code':
            // this.formTop.admissionStateList = list;
            this.admissionStateList = list;
            break;
          case 'frozen_state_code':
            this.frozenStateList = list;
            break;
          case 'push_state_code':
            this.pushStateList = list;
            break;
          case 'push_system_code':
            this.pushSystemList = list;
            break;
          case 'revenue_direction_code':
            this.revenueDirectionList = list;
            break;
        }
      },
      pushOpenChange(flag) {
        if (flag)
          this.loadDataDic('push_state_code');
      },
      admissionStateOpenChange(flag) {
        if (flag)
          this.loadDataDic('admission_state_code');
      },
      writeOffStateOpenChange(flag) {
        if (flag)
          this.loadDataDic('writeOff_state_code');
      },
      recognitionStateChange(val) {
        if (val == 3 || val == 4) {
          this.bankFlag = true
        } else {
          this.bankFlag = false
        }
      },
      recognitionOpenChange(flag) {
        if (flag)
          this.loadDataDic('recognition_state_code');
      },
      paymentOpenChange(flag) {
        if (flag)
          this.loadDataDic('payment_type_code');
      },
      paymentQuery(val) {
        if (val) {
          let params = {
            dicClassCode: 'payment_type_code',
            dicCode: val
          };
          fetchDataDic(params)
            .then(res => {
              if (res.data.code == 200) {
                this.formTop.paymentList = res.data.data;
              }
            })
        }
      },
      businessLineOpenChange(flag) {
        if (flag)
          this.loadDataDic('service_line_code');
      },
      businessLineQuery(val) {
        if (val) {
          let params = {
            businessCode: val
          };
          fetchDataDic1(params)
            .then(res => {
              if (res.data.code == 200) {
                this.formTop.businessLineList = res.data.data;
              }
            })
        }
      },
      accountOpenChange(flag) {
        if (flag)
          this.loadDataDic('financial_institutions_code');
      },
      accountQuery(val) {
        if (val) {
          let params = {
            dicClassCode: 'financial_institutions_code',
            dicCode: val
          };
          fetchDataDic(params)
            .then(res => {
              if (res.data.code == 200) {
                this.formTop.accountList = res.data.data;
              }
            })
        }
      },
      sourceOpenChange(flag) {
        if (flag)
          this.loadDataDic('source_code');
      },
      expand(flag) {
        // eventBus.$emit('expand',flag)
      },
      //收起
      slideUp() {
        this.flag = false;
        this.slideUpFlag = false;
        this.slideDownFlag = true;
        window.sessionStorage.setItem('slide', false)
      },
      //展开
      slideDown() {
        this.slideUpFlag = true;
        this.flag = false;
        this.slideDownFlag = false;
        window.sessionStorage.setItem('slide', true)
      },
      //动态获取表头
      getColumns() {
        let data = {
          tableType: '1'
        };
        getColumns(data).then((res) => {
          if (res.data.code == 200) {
            if (res.data.data) {
              this.list = [];
              res.data.data.forEach((item, index) => {
                let obj = {
                  columnCode: item.columnCode,
                  columnValue: item.columnValue,
                  id: item.id,
                  _checked: true,
                  sort: false,
                  isAble: item.isAble,
                  columnLength: item.columnLength,
                  alignmentWay: item.alignmentWay,
                };
                if (item.isCheck == 0)
                  obj._checked = false;
                if (item.isSort == 1)
                  obj.sort = true;
                this.list.push(obj)
              });
              if (this.firstTable) {
                this.sure();
                this.firstTable = false;
              }
            }
          }
        })
      },
      //新增
      add() {
        this.addFlag = true;
        eventBus.$emit('add', this.addFlag)
      },
      //判断数组全等
      isAllEqual(array) {
        if (array.length > 0) {
          return !array.some((value, index) => {
            return value !== array[0]
          });
        } else {
          return true
        }
      },
      //批量认款
      batchRecognition() {
        if (this.selectArr.length > 0) {
          let enterStateArr = [];
          enterStateArr = this.selectArr.filter((item, index) => {
            return item.enterStateArr == '3';
          });
          if (enterStateArr.length > 0) {
            this.$Message.warning('所选数据包含已完全认款的数据，请重新选择！');
            return;
          }
          let confirmStateArr = [];
          confirmStateArr = this.selectArr.filter((item, index) => {
            return item.confirmState == '4';
          });
          if (confirmStateArr.length > 0) {
            this.$Message.warning('所选数据包含无需认款数据，请重新选择！');
            return;
          }
          let chargeAgainstStateArr = [];
          chargeAgainstStateArr = this.selectArr.filter((item, index) => {
            return item.chargeAgainstState == '2' || item.chargeAgainstState == '3'
          });
          if (chargeAgainstStateArr.length > 0) {
            this.$Message.warning('所选数据中存在冲销数据,请重新选择！');
            return;
          }
          let confirmLockArr = [];
          confirmLockArr = this.selectArr.filter((item, index) => {
            return item.confirmLock == 2
          });
          if (confirmLockArr.length > 0) {
            this.$Message.warning('所选行包含已冻结的数据，不允许批量认款!');
            return;
          }
          let financialSystemCodeArr = [];
          let confirmCurrencyCodeArr = [];
          let nostroBankAccountNumberArr = [];
          let paymentTypeCodeArr = [];
          this.selectArr.forEach((item, index) => {
            financialSystemCodeArr.push(item.financialSystemCode);
            confirmCurrencyCodeArr.push(item.exchangeCurrencyCode);
            nostroBankAccountNumberArr.push(item.nostroBankAccountNumber);
            paymentTypeCodeArr.push(item.paymentTypeCode)
          });
          let fscFlag = false;
          let cccFlag = false;
          let nbabFlag = false;
          let pdcFlag = false;
          fscFlag = this.isAllEqual(financialSystemCodeArr);
          cccFlag = this.isAllEqual(confirmCurrencyCodeArr);
          nbabFlag = this.isAllEqual(nostroBankAccountNumberArr);
          pdcFlag = this.isAllEqual(paymentTypeCodeArr);
          if (!fscFlag) {
            this.$Message.warning('所选数据中核算主体不一致，不能批量认款，请重新选择！');
            return;
          }
          if (!cccFlag) {
            this.$Message.warning('所选数据中交易币不一致，不能批量认款，请重新选择！');
            return;
          }
          if (!nbabFlag) {
            this.$Message.warning('所选数据中账号不一致，不能批量认款，请重新选择！');
            return;
          }
          if (!pdcFlag) {
            this.$Message.warning('所选数据中款项类型不一致数据，不能批量认款，请重新选择！');
            return;
          }
          let unConfirmMoneyAmountArr = [];
          unConfirmMoneyAmountArr = this.selectArr.filter((item, index) => {
            return item.unConfirmMoneyAmount == 0
          });
          if (unConfirmMoneyAmountArr.length > 0) {
            this.$Message.warning('所选行中存在未认款金额等于0的数据，请重新选择！');
            return;
          }
          if (fscFlag && cccFlag && nbabFlag && pdcFlag) {
            let paymentTypeCode = this.selectArr[0].paymentTypeCode;
            let filterArr = this.formTop.paymentList.filter((item, index) => {
              return paymentTypeCode == item.dicCode;
            });
            if (filterArr.length > 0) {
              if (filterArr[0].dicValueOne == '总账处理模式') {
                this.isLedger = true;
              } else {
                this.isLedger = false;
              }
            } else {
              this.isLedger = false;
            }
            let accountTimeArr = [];
            let exchangeTimeArr = [];
            this.selectArr.forEach((item, index) => {
              accountTimeArr.push(new Date(item.accountantTime).getTime());
              exchangeTimeArr.push(new Date(item.exchangeTime).getTime())
            });
            accountTimeArr.sort((a, b) => {
              return a - b;
            });
            exchangeTimeArr.sort((a, b) => {
              return a - b;
            });
            let minAccountTime = accountTimeArr[0];
            let minExchangeTime = exchangeTimeArr[0];
            this.minAccountTimeS = new Date(minAccountTime).Format('yyyy-MM');
            this.minExchangeTimeS = new Date(minExchangeTime).Format('yyyy-MM-dd');
            this.recognitionFlag = true;
            eventBus.$emit('recognitionEvent', this.recognitionFlag, this.selectArr, this.ids, this.isLedger)
          } else {
            this.$Message.warning('所选行包含【核算主体】、【交易币】、【账号】、【款项类型】不一致数据，不能批量认款，请重新选择！');
          }
        } else {
          this.$Message.warning('请至少选择一行数据！')
        }
      },
      //推送
      push() {
        this.pushFlag = true;
        eventBus.$emit('pushFlag', this.pushFlag)
      },
      checkExchange(val, columnCode) {
        if (val) {
          this.list.forEach((item, index) => {
            if (item.columnCode == columnCode) {
              item._checked = true;
            }
          })
        } else {
          this.list.forEach((item, index) => {
            if (item.columnCode == columnCode) {
              item._checked = false;
            }
          })
        }
      },
      getCompanyMenuAddressChange(menuAddress) {
        let param = {};
        if (menuAddress.length > 0 && menuAddress != '请输入') {
          param.menuAddress = menuAddress;
          addressLikeList(param).then(res => {
            if (res.status == 200) {
              res = res.data;
              if (res.code == 200) {
                this.addressCodeData = res.data;
              }
            }
          })
        }
        this.formTop.menuAddress = menuAddress;
      },
      getpage(page) {
        let oldPage = this.page;
        this.page = page;
        this.loadPaymentProceedsList(oldPage, this.rows);
      },
      getpageSize(rows) {
        this.page = 1;
        let oldRows = this.rows;
        this.rows = rows;
        this.loadPaymentProceedsList(this.page, oldRows);
      },
      forstop() {
        this.a = true
      },
      updateUserColumn() {
        var data = new FormData();
        var columns = [];
        this.list.forEach((value, index) => {
          var column = {tableType: 1};
          column.id = value.id;
          if (value._checked) {
            column.isCheck = 1;
          } else {
            column.isCheck = 0;
          }
          column.columnSort = index;
          columns.push(column);
        });
        data.append("colnumJson", JSON.stringify(columns));
        data.append("tableType", 1);
        updateUserColnum(data)
          .then(res => {
            this.$Message.success('操作成功！')
          })
      },
      sure() {
        //判断是否可以添加表头
        let flag = false;
        let filter = this.list.filter((item => {
          return item._checked == true
        }));
        if (filter.length > 0) {
          flag = true;
          if (!this.firstTable)
            this.updateUserColumn()
        } else {
          flag = false;
          this.$Message.warning('请选择入帐会计日期或者认款状态进行查询！');
          return;
        }
        //初始化默认表头
        this.loadFirstTitle();
        //循环添加已选择的表头
        this.list.forEach((item, index) => {
          if (item._checked) {
            let obj = {};
            if (item.columnCode == 'chargeAgainstState') {
              obj = {
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                sortable: item.sort ? 'custom' : false,
                render: (h, params) => {
                  let state = '';
                  if (this.formTop.writeOffStateList && this.formTop.writeOffStateList.length > 0) {
                    this.formTop.writeOffStateList.map(function (value) {
                      if (value.dicCode == params.row.chargeAgainstState) {
                        state = value.dicNameZh;
                        params.row.chargeAgainstState = value.dicCode;
                      }
                    });
                  }
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'confirmState') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  if (this.formTop.recognitionStateList && this.formTop.recognitionStateList.length > 0) {
                    this.formTop.recognitionStateList.map(function (value) {
                      if (value.dicCode == params.row.confirmState) {
                        state = value.dicNameZh;
                        params.row.confirmState = value.dicCode;
                      }
                    });
                  }
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'enterCeState') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  this.pushStateList.map(function (value) {
                    if (value.dicCode == params.row.enterCeState) {
                      state = value.dicNameZh;
                      params.row.enterCeState = value.dicCode;
                    }
                  });
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'confirmPlatformCode') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  this.pushSystemList.map(function (value) {
                    if (value.dicCode == params.row.confirmPlatformCode) {
                      state = value.dicNameZh;
                      params.row.confirmPlatformCode = value.dicCode;
                    }
                  });
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'confirmLock') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  this.frozenStateList.map(function (value) {
                    if (value.dicCode == params.row.confirmLock) {
                      state = value.dicNameZh;
                      params.row.confirmLock = value.dicCode;
                    }
                  });
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'enterAccountsState') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  this.admissionStateList.map(function (value) {
                    if (value.dicCode == params.row.enterAccountsState) {
                      state = value.dicNameZh;
                      params.row.enterAccountsState = value.dicCode;

                    }
                  });
                  return h('span', state)
                },
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'confirmMoneyAmount') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let money = '';
                  if (params.row.confirmMoneyAmount == 0) {
                    money = 0
                  } else {
                    money = this.numFormat((params.row.confirmMoneyAmount / 100).toFixed(2))
                  }
                  return h('span', money)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'exchangeMoneyAmount') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let money = '';
                  if (params.row.exchangeMoneyAmount == 0) {
                    money = 0
                  } else {
                    money = this.numFormat((params.row.exchangeMoneyAmount / 100).toFixed(2))
                  }
                  return h('span', money)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'nostroMoneyAmount') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let money = '';
                  if (params.row.nostroMoneyAmount == 0) {
                    money = 0
                  } else {
                    money = this.numFormat((params.row.nostroMoneyAmount / 100).toFixed(2))
                  }
                  return h('span', money)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'unConfirmMoneyAmount') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let money = '';
                  if (params.row.unConfirmMoneyAmount == 0) {
                    money = 0
                  } else {
                    money = this.numFormat((params.row.unConfirmMoneyAmount / 100).toFixed(2));
                  }
                  return h('span', money)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'exchangeTime') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let exchangeTime = '';
                  exchangeTime = new Date(params.row.exchangeTime).Format('yyyy-MM-dd');
                  return h('span', exchangeTime)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'accountantTime') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let accountantTime = '';
                  accountantTime = new Date(params.row.accountantTime).Format('yyyy-MM');
                  return h('span', accountantTime)
                }
              };
              this.columns1.push(obj);

            } else if (item.columnCode == 'paymentsDirection') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let state = '';
                  this.revenueDirectionList.map(function (value) {
                    if (value.dicCode == params.row.paymentsDirection) {
                      state = value.dicNameZh;
                      params.row.paymentsDirection = value.dicCode;
                    }
                  });
                  return h('span', state)
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'proceedsCode') {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'merchantNumber') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'reciprocalBankAccountName') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'reciprocalBankAccountNumber') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'productName') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'accountTransaction') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'businessName') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'businessType') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'merchantOrderNumber') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'paymentWaterCode') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else if (item.columnCode == 'degestComment') {
              obj = {
                sortable: item.sort ? 'custom' : '',
                title: item.columnValue,
                key: item.columnCode,
                ellipsis: true,
                tooltip: true,
                width: item.columnLength,
                align: item.alignmentWay,
                render: (h, params) => {
                  let texts = '';
                  if (params.row[item.columnCode] !== null) {
                    if (('' + params.row[item.columnCode]).length > 13) {
                      texts = params.row[item.columnCode].substring(0, 10) + '...';
                    } else {
                      texts = params.row[item.columnCode]
                    }
                  }
                  return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'bottom',
                        transfer: true
                      }
                    }, [
                      texts,
                      h('div', {
                        slot: 'content',
                        style: {
                          whiteSpace: 'normal',
                          wordBreak: 'break-all',
                        }
                      }, params.row[item.columnCode])
                    ])
                  ])
                }
              };
              this.columns1.push(obj);
            } else {
              obj = {
                sortable: item.sort ? 'custom' : false,
                title: item.columnValue,
                key: item.columnCode,
                width: item.columnLength,
                align: item.alignmentWay,
                ellipsis: true,
                tooltip: true,
                // render:(h,params) => {
                //   let texts='';
                //   if(params.row[item.columnCode] !== null){
                //     if((''+params.row[item.columnCode]).length >13){
                //       texts=params.row[item.columnCode].substring(0,10) +'...';
                //     }else{
                //       texts=params.row[item.columnCode]
                //     }
                //   }
                //   return h('div',[
                //     h('Tooltip',{
                //       props:{
                //         placement:'bottom',
                //         transfer:true
                //       }
                //     },[
                //       texts,
                //       h('div',{
                //         slot:'content',
                //         style:{
                //           whiteSpace:'normal',
                //           wordBreak:'break-all',
                //         }
                //       },params.row[item.columnCode])
                //     ])
                //   ])
                // }
              };
              this.columns1.push(obj);
            }
          }
        });
        this.loadTitleSetting();
        //关闭选择框
        this.flag = false;
      },
      // 千分位
      numFormat(data) {
        return data && (data.toString().indexOf('.') != -1 ? data.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ',';
        }) : data.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))
      },

      //会计日期开始结束限制
      startTimeChange: function (e) { //设置开始时间
        if (e) {
          this.bankFlag1 = false;
        } else {
          this.bankFlag1 = true;
        }
        this.formTop.startDateM = e;
        this.endTimeOptions = {
          disabledDate: date => {
            let startTime = this.formTop.startDateM ? new Date(this.formTop.startDateM).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() < startTime);
          }
        };
        if (this.formTop.endDateM) {
          let startTime = new Date(this.formTop.startDateM).getTime();
          let endTime = new Date(this.formTop.endDateM).getTime();
          if (startTime > endTime) {
            this.formTop.endDateM = this.formTop.startDateM
          }
        } else {
          this.formTop.endDateM = this.formTop.startDateM
        }
      },
      endTimeChange: function (e) { //设置结束时间
        this.formTop.endDateM = e;
        if (e) {
          let endTime = this.formTop.endDateM ? new Date(this.formTop.endDateM).valueOf() : '';
          this.startTimeOptions = {
            disabledDate(date) {
              return date && date.valueOf() > endTime;
            }
          }
        } else {
          this.startTimeOptions = {
            disabledDate(date) {
              return '';
            }
          }
        }
        if (this.formTop.startDateM) {
          let startTime = new Date(this.formTop.startDateM).getTime();
          let endTime = new Date(this.formTop.endDateM).getTime();
          if (endTime < startTime) {
            this.formTop.startDateM = this.formTop.endDateM
          }
        } else {
          this.formTop.startDateM = this.formTop.endDateM
        }
      },
      //交易日期开始结束限制
      startTimeChange1: function (e) { //设置开始时间
        this.formTop.startDateS = e;
        this.endTimeOptions1 = {
          disabledDate: date => {
            let startTime = this.formTop.startDateS ? new Date(this.formTop.startDateS).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() <= startTime);
          }
        };
        if (this.formTop.endDateS) {
          let startTime = new Date(this.formTop.startDateS).getTime();
          let endTime = new Date(this.formTop.endDateS).getTime();
          if (startTime > endTime) {
            this.formTop.endDateS = this.formTop.startDateS
          }
        } else {
          this.formTop.endDateS = this.formTop.startDateS
        }
      },
      endTimeChange1: function (e) { //设置结束时间
        this.formTop.endDateS = e;
        if (e) {
          let endTime = this.formTop.endDateS ? new Date(this.formTop.endDateS).valueOf() : '';
          this.startTimeOptions1 = {
            disabledDate(date) {
              return date && date.valueOf() >= endTime;
            }
          }
        } else {
          this.startTimeOptions1 = {
            disabledDate(date) {
              return ''
            }
          }
        }
        if (this.formTop.startDateS) {
          let startTime = new Date(this.formTop.startDateS).getTime();
          let endTime = new Date(this.formTop.endDateS).getTime();
          if (endTime < startTime) {
            this.formTop.startDateS = this.formTop.endDateS
          }
        } else {
          this.formTop.startDateS = this.formTop.endDateS
        }
      },
      //创建日期开始结束日期限制
      startTimeChange2: function (e) { //设置开始时间
        this.formTop.startDateC = e;
        this.endTimeOptions2 = {
          disabledDate: date => {
            let startTime = this.formTop.startDateC ? new Date(this.formTop.startDateC).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() < startTime);
          }
        };
        if (this.formTop.endDateC) {
          let startTime = new Date(this.formTop.startDateC).getTime();
          let endtTime = new Date(this.formTop.endDateC).getTime();
          if (startTime > endtTime) {
            this.formTop.endDateC = this.formTop.startDateC;
          }
        } else {
          this.formTop.endDateC = this.formTop.startDateC;
        }
      },
      endTimeChange2: function (e) { //设置结束时间
        this.formTop.endDateC = e;
        if (e) {
          let endTime = this.formTop.endDateC ? new Date(this.formTop.endDateC).valueOf() : '';
          this.startTimeOptions2 = {
            disabledDate(date) {
              return date && date.valueOf() > endTime;
            }
          }
        } else {
          this.startTimeOptions2 = {
            disabledDate(date) {
              return '';
            }
          }
        }
        if (this.formTop.startDateC) {
          let startTime = new Date(this.formTop.startDateC).getTime();
          let endtTime = new Date(this.formTop.endDateC).getTime();
          if (endtTime < startTime) {
            this.formTop.startDateC = this.formTop.endDateC
          }
        } else {
          this.formTop.startDateC = this.formTop.endDateC
        }
      },
      getTraadingCurrency(value) {
      },
      //交易币模糊查询
      getTraadingCurrencyChange(value) {
        if (value && value != '请输入') {
          let param = {dicClassCode: 'money_type_code'};
          if (/^[a-zA-Z]*$/.test(value)) {
            param.dicCode = value;
          } else {
            param.dicNameZh = value;
          }
          fetchDataDic(param).then(res => {
            if (res.status == 200 && res.data.code == 200) {
              this.formTop.traadingCurrencyList = res.data.data ? res.data.data : [];
            }
          })
        }
      },
      openTraadingCurrency(value) {
        if (!value) {
          if (!(this.$refs.traadingCurrency.values && this.$refs.traadingCurrency.values.length > 0)) {
            this.$refs.traadingCurrency.query = '';
          }
        }
      },
      getStandardCurrency(value) {
      },
      //交易币模糊查询
      getStandardCurrencyChange(value) {
        if (value && value != '请输入') {
          let param = {dicClassCode: 'money_type_code'};
          if (/^[a-zA-Z]*$/.test(value)) {
            param.dicCode = value;
          } else {
            param.dicNameZh = value;
          }
          fetchDataDic(param).then(res => {
            if (res.status == 200 && res.data.code == 200) {
              this.formTop.standardCurrencyList = res.data.data ? res.data.data : [];
            }
          })
        }
      },
      openStandardCurrency(value) {
        if (!value) {
          if (!(this.$refs.standardCurrency.values && this.$refs.standardCurrency.values.length > 0)) {
            this.$refs.standardCurrency.query = '';
          }
        }
      },
      openFounder(value) {
        if (!value) {
          if (!(this.$refs.founder.values && this.$refs.founder.values.length > 0)) {
            this.$refs.founder.query = '';
          }
        }
      },
      getOurAccount(value) {
      },
      //我方账号模糊查询
      getOurAccountChange(value) {
        if (value && value != '请输入') {
          let param = {};
          param.bankInstitutionNumber = value;
          fetchOurAcc(param).then(res => {
            if (res.status == 200 && res.data.code == 200) {
              this.formTop.outAccountList = res.data.data ? res.data.data : [];
            }
          })
        }
      },
      openOurAccount(value) {
        if (!value) {
          if (!(this.$refs.ourAccount.values && this.$refs.ourAccount.values.length > 0)) {
            this.$refs.ourAccount.query = '';
          }
        }
      },
      openaccountingSubject(value) {
        if (!value) {
          if (!(this.$refs.accountingSubjectName.values && this.$refs.accountingSubjectName.values.length > 0)) {
            this.$refs.accountingSubjectName.query = '';
          }
        }
      },
      getAccountingSubjectName(value) {
      },
      //核算主体名称
      getAccountingSubjectNameChange(value) {
        if (value) {
          let data = {};
          data.financialSystemCode = value
          this.formTop.mainNameList = []
          fetchMainName(data).then(res => {
            if (res.data.code == 200) {
              this.formTop.mainNameList = res.data.data ? res.data.data : [];
            }
          })
        }
      },
      //创建人
      getFounder(value) {
        if (value && value != '请输入') {
          let param = {};
          param.userName = value;
          userFindList1(param).then(res => {
            if (res.status == 200 && res.data.code == 200) {
              var userList = res.data.data ? res.data.data : [];
              if ("system".indexOf(value) > -1) {
                var user = {id: 0, name: 'system'};
                userList.push(user);
              }
              this.formTop.founderList = userList;
            }
          })
        } else {
          this.formTop.founderList = [];
        }
      },
      resetColumns() {
        let data = {
          tableType: '1',
        };
        resetUserColnum(data)
          .then(res => {
            if (res.data.code == 200) {
              setTimeout(() => {
                this.list = [];
                res.data.data && res.data.data.length > 0 ? res.data.data.forEach((item, index) => {
                  let obj = {
                    columnCode: item.columnCode,
                    columnValue: item.columnValue,
                    id: item.id,
                    _checked: true,
                    sort: false,
                    isAble: item.isAble,
                    columnLength: item.columnLength,
                    alignmentWay: item.alignmentWay,

                  };
                  if (item.isCheck == 0)
                    obj._checked = false;
                  if (item.isSort == 1)
                    obj.sort = true;
                  this.list.push(obj)
                }) : this.list = [];
              }, 1000);
            }
          })
      },
      async loadDataAsync() {
        this.loadDataDic('admission_state_code');//入账状态调用
        this.loadDataDic('recognition_state_code');//认款状态调用
        this.loadDataDic('writeOff_state_code');//冲销状态调用
        this.loadDataDic('frozen_state_code');//冻结状态调用
        this.loadDataDic('push_state_code');//推送状态调用
        this.loadDataDic('push_system_code');//已推送系统调用
        this.loadDataDic('revenue_direction_code');//收支方向
        this.loadDataDic('payment_type_code');//款项类型
        await this.loadFirstFormTop();
        await this.getColumns();
      },
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          that.screenWidth = document.body.clientWidth;
          that.flag = false;
        })()
      }
    },
    computed: {
      eventOptsCapital() {
        return {
          onChange: this.capitalOnChange
        }
      },
      formRows() {
        const _this = this
        return [
          //第一行
          [
            {
              name: 'form-item-datepicker',
              attr: {
                label: '创建日期',
                hasEndDate: true,
                colspan: ['11', '2', '11'],
                dateType: ['date', 'date'],
                datePlaceHolder: ['选择开始日期', '选择结束日期'],
                startDate: _this.formTop.startDateC, //这样使用无效，需要在change事件里  this.formtop.startDateC = 回掉函数的值
                endDate: _this.formTop.endDateC,
                startDateOptions: _this.endTimeOptions2,
                endDateOptions: _this.endTimeOptions2,
                //事件
                eventOpts: {
                  startDateChanged: _this.testDateChange
                }
              }
            },
            {
              name: 'form-item-datepicker',
              attr: {
                label: '入账会计日期',
                prop: 'startDateM',
                formItemClassName: ['enterDate'],
                colspan: '24',
                dateType: 'month',
                startDatePickerClassName: ['date'],
                datePlaceHolder: '选择入账会计日期',
                startDate: this.formTop.startDateM,
                startDateOptions: this.startTimeOptions,
                //补充事件
              }
            },
            {
              name: 'form-item-datepicker',
              attr: {
                label: '交易日期',
                hasEndDate: true,
                colspan: ['11', '2', '11'],
                dateType: ['date', 'date'],
                startDate: _this.formTop.startDateS,
                endDate: _this.formTop.endDateS,
                startDateOptions: _this.startTimeOptions1,
                endDateOptions: _this.endTimeOptions1,
                //补充事件
              }
            },
            {
              name: 'form-item-input',
              attr: {
                label: '资金流水号',
                value: _this.formTop.capitalFlowNumber,
                maxlength: 50,
                placeholder: '请输入',
                //事件
                eventOpts: {
                  onChange: function (e) {
                    console.log('资金1', e.target.value)
                  },
                  onBlur: function (e) {
                    console.log('blur', e.target.value)
                  }
                }
              }
            }
          ],
          //第二行
          [
            {
              name: 'form-item-datepicker',
              attr: {
                label: '交易日期',
                hasEndDate: true,
                colspan: ['11', '2', '11'],
                dateType: ['date', 'date'],
                startDateSync: 'startDateC',
                endDateSync: 'endDateC',
                startDate: _this.formTop.startDateC,
                endDate: _this.formTop.endDateC,
                startDateOptions: _this.startTimeOptions1,
                endDateOptions: _this.endTimeOptions1,
                //事件
                eventOpts: {
                  startDateChanged: function () {
                    console.log('开始日期open', _this.formTop.startDateC)
                  },
                  endDateOpenChanged: function () {
                    console.log('结束日期open')
                  }
                }
              }
            },
            {
              name: 'form-item-input',
              attr: {
                label: '资金流水号',
                prop: 'capitalFlowNumber',
                value: _this.formTop.capitalFlowNumber,
                maxlength: 50,
                placeholder: '请输入',
                //事件
                eventOpts: {
                  onChange: function (e) {
                    console.log('资金2', _this.formTop.capitalFlowNumber)

                    // _this.formTop.capitalFlowNumber = e.target.value
                  }
                }
              }
            },
            {
              name: 'form-item-select',
              attr: {
                label: '来源',
                prop: 'state',
                value: _this.formTop.state,
                placeholder: '请选择',
                optionList: _this.formTop.recognitionStateList,
                optionOpts: {key: 'dicCode', label: 'dicNameZh'},
                //事件
                eventOpts: {
                  onChange: function (e) {
                    console.log('来源', _this.formTop.state)

                    // _this.formTop.capitalFlowNumber = e.target.value
                  }
                }
              }
            }
          ],
          //第三行
          [
            {
              name: 'form-item-btns',
              attr: {
                formItemStyle: 'text-align: right',
                btnsOption: [
                  {
                    type: 'primary',
                    label: '查询',
                    clickCallback: function () {
                      // let refs = _this.$children.find(child=>child.$options._componentTag==='form-items').$refs
                      _this.$refs['formTopNewParent'].$refs['formTopNew'].validate((valid) => {
                        console.log('查询', valid);
                        if (valid) {
                          _this.$Message.success('验证成功')
                        } else {
                          _this.$Message.error('验证失败')
                        }
                      })
                    }
                  },
                  {
                    type: 'default',
                    label: '重置',
                    clickCallback: function () {
                      console.log('重置')
                    }
                  },
                  {
                    type: 'default',
                    label: '展开',
                    clickCallback: function () {
                      console.log('展开');
                      _this.slideDown()
                    }
                  }
                ]
              }
            }
          ]
        ]
      },
      btnsOption() {
        return [
          {
            type: 'primary', label: '查询',
            clickCallback: function () {
              console.log('查询')
            }
          },
          {
            type: 'default', label: '重置',
            clickCallback: function () {
              console.log('重置')
            }
          }
        ]
      },
      eventOptions1() {
        return {
          startDateChanged(val) {
            console.log('开始时间信息', val)
          },
          endDateChanged(val) {
            console.log('结束时间信息', val)
          }
        }
      },
      eventOptions2() {
        return {
          onChange(val) {
            console.log(111, val)
          },
          onOpenChange(val) {
            // console.log('选择框')
          },
          onQueryChange(val) {
            // console.log('选择框')
          }
        }
      },
      eventOptionsbusinessLine() {
        const _this = this
        return {
          onOpenChange(val) {
            console.log('产品线change')
            _this.loadDataDic('service_line_code');
          },
          onQueryChange(val) {
            console.log('产品线query')
          }
        }
      },
      proceedsCodeS() {
        if (this.$route.query.proceedsCode) {
          return this.$route.query.proceedsCode;
        } else {
          return '';
        }
      }
    },
    watch: {
      formTop: {
        handler(newVal) {
          console.log('测试', newVal)
        },
        deep: true
      },
      screenWidth(val) {
        if (!this.timer1) {
          this.screenWidth = val;
          this.timer1 = true;
          let that = this;
          setTimeout(function () {
            that.timer1 = false;
          }, 400)
        }
      },
      proceedsCodeS(val, oldval) {
        if (val) {
          let proceedsCodeRecogFlag = window.sessionStorage.getItem('proceedsCodeRecogFlag');
          if (!proceedsCodeRecogFlag) {
            this.formTop.receiptNumber = val;
            this.searchPayment('formTop');
          }
        }
      },
    },
    created() {
      this.loadDataAsync();
      let that = this;
      window.sessionStorage.setItem('slide', true);
      eventBus.$on('loadPaymentProceedsList1', function () {
        that.searchPaymentUpdate();
      });
      this.$on('search', function () {
        that.searchPaymentUpdate();
      });
      this.formTop.receiptNumber = this.$route.query.proceedsCode;
      if (this.formTop.receiptNumber) {
        this.searchPayment('formTop')
      }
      this.fetResourceButton()
    },
    beforeDestroy() {
      eventBus.$off('loadPaymentProceedsList1');
      eventBus.$off('search');
    }
  }
</script>

<style scoped lang='less'>

  .tab {
    border-bottom: 0.02rem solid #0086b3;
    font-family: PingFangSC-Regular;
    font-size: 0.18rem;
    color: #333333;
    text-align: left;
    margin-bottom: 0.22rem;
    font-weight: bolder;
  }

  .ivu-col-span-8 {
    float: right;
  }

  .page {
    text-align: right;
    margin-top: 0.22rem;
  }

  .he {
    display: flex;
    justify-content: space-between;
  }

  .mt25 {
    margin-top: 25px;
  }

  .titleFilter {
    position: absolute;
    background-color: #fff;
    z-index: 100;
    min-width: 150px;
    max-height: 200px;
    box-shadow: 0px 0px 2px #ccc;
    border-radius: 5px;
  }

  .set-div {
    height: 200px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .set-button {
    width: 90%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 0;
    height: 50px;
    background: #fff;
  }

  .checkbox {
    margin-left: 20px;
    margin-bottom: 8px;
    margin-top: 8px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .ml25 {
    margin-left: 25px;
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .ml7 {
    margin-left: 7px;
  }

  .ivu-icon-editBtn {
    margin-left: 8px;
    margin-right: 8px;
    height: 34px;
    line-height: 34px;
  }

  .ivu-icon-ios-trash-outline {
    margin-left: 8px;
    margin-right: 8px;
    height: 34px;
    line-height: 34px;
  }

  /deep/ .ivu-poptip-body-content {
    height: 34px;
    line-height: 34px;
  }

  .date {
    width: 100%;
  }

  /deep/ .enterDate .ivu-form-item-content {
    height: 32px;
  }
</style>
