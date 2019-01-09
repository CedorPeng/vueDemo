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
    let reg = new RegExp(' ','g');
    let str = value.replace(reg,'');
    return str;
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
   *
   * */


}



















