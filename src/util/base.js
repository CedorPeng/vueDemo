export const CedorUtils = function(){
  this.name = 'Cedor';
  this.age = 26;
}

CedorUtils.prototype = {
  /**
   * @获取localStorage中的属性值
   * */
  getLocalValue:(name)=>{
    return JSON.parse(localStorage.getItem(name)) || ''
  },
  /**
   * @设置localStorage中的属性
   * */
  setLocalValue:(name,value)=>{
    localStorage.setItem(name,value)
  },
  /**
   * @移除localStorage中的属性
   * */
  removeLocalValue:(name)=>{
    localStorage.removeItem(name)
  },
  /**
   * @数字转换千分位
   * */
  setThousand:(value,place)=>{
    value = value || 0;
    place = !isNaN(place = Math.abs(place)) ? place : 2;
    let thousand = ',',decimal = '.',
        negative = value < 0 ? '-' : '',
        i = parseInt(value = Math.abs(+value || 0).toFixed(place),10) + '',
        j = (j = i.length) > 3 ? j % 3 : 0;
    return  negative + (j ? i.substr(0 , j) + thousand : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g,'$1' + thousand) +
            (place ? decimal + Math.abs(value - i).toFixed(place).slice(2) : '')

  },
  /**
   * @字符串去掉全部空格
   * */
  trimString:value=>{
    return value.replace(/\s/g,'');
  },
  /**
   * @数组去重
   * */
  removeRepeat:value=>{
    let arr = [],obj={};
    for (let i = 0 ; i < value.length ; i++){
      if(!obj[value[i]]){
        arr.push(value[i]);
        obj[value[i]] = 1;
      }
    }
    return arr
  },
  /**
   * @数组排序
   * */
  sortArray:value=>{
    let sortNum = (a,b)=>{
      return a - b;
    }
    return value.sort(sortNum)
  },
  /**
   * @数组拼接
   * */
  concatArray:(value1,value2)=>{
    return value1.concat(value2)
  },
  /**
   * @从url中获取hash
   * */
  getUrlHash:value=>{
    const keyValueArr = value.split('?')[1].split('&');
    let hashObject = {};
    keyValueArr.forEach(item=>{
      const keyValue = item.split('=')
      hashObject[keyValue[0]] = keyValue[1]
    })
    return hashObject
  },
  /**
   * @个位数 + 0
   * */
  unidigitAddZero:value=>{
    return value < 10 ? '0' + value : value;
  },
  /**
   * @时间戳转换YYYY-MM-DD HH-mm-ss
   * @value   {Date}   需要处理的时间戳
   * @format  {String} 处理成的格式 'YYYY-MM-DD YYYY-MM-DD hh:mm:ss YYYY/MM/DD YYYY/MM/DD hh:mm:ss'
   * */
  setTimeFilter:function(value,format){
    let time = new Date(value)
    format = format || 'YYYY-MM-DD'
    let Y = time.getFullYear(),
        M = this.unidigitAddZero(time.getMonth() + 1),
        D = this.unidigitAddZero(time.getDate()),
        h = this.unidigitAddZero(time.getHours()),
        m = this.unidigitAddZero(time.getMinutes()),
        s = this.unidigitAddZero(time.getSeconds()),
        result = '';
    switch (format) {
      case 'YYYY-MM-DD':
        result = Y + '-' + M + '-' + D;
        break;
      case 'YYYY-MM-DD hh:mm:ss' :
        result = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        break;
      case 'YYYY/MM/DD':
        result = Y + '/' + M + '/' + D;
        break;
      case 'YYYY/MM/DD hh:mm:ss' :
        result = Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
        break;
      default:
        break;
    }
    return result;
  },
  /**
   * @正则验证小数  decimals 小数
   * @+一次或多次 ?0次或多次 {m}必须m次 {m,}最少m次 {m,n}出现m-n次
   * */
  validateDecimals:value=>{
    let reg = /^[+-]?\d+(\.\d+)?$/;
    return reg.test(value);
  },
  /**
   * @正则验证千分位数字
   * */
  validateThousand:value=>{
    let reg = /^[+-]?\d{1,3}(,\d{3})*(.\d+)?$/;
    return reg.test(value);
  },
  /**
   * @正则验证正负整数
   * */
  validateInteger:value=>{
    let reg = /^[+-]?\d+$/;
    return reg.test(value);
  },
  /**
   * @正则验证email
   * */
  validateEmail:value=>{
    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(value);
  },
  /**
   * @全局提取email
   * */
  extractAllEmail:value=>{
    return value.match(/[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}/g)
  },
  /**
   * @正则验证手机号
   * */
  validatePhone:value=>{
    let reg = /^1([358]\d|4[579]|66|7[0135678]|9[89])\d{8}$/;
    return reg.test(value);
  },
  /**
   * @正则验证数字和英文(非中文以及标点)
   * */
  validateNoneChinese:value=>{
    let reg = /^[a-zA-Z0-9]+$/;
    return reg.test(value);
  },
  /**
   * @正则验证数字英文包括下划线(非中文以及特殊标点)
   * */
  validateNoneChinese_:value=>{
    let reg = /^\w+$/;
    return reg.test(value);
  },
  /**
   * @正则验证纯英文
   * @\.\+\$表示解译可匹配的用来添加可匹配的特殊符号
   * */
  validateEnglish:value=>{
    let reg = /^[a-zA-Z]{3}$/;
    return reg.test(value);
  },


}



















