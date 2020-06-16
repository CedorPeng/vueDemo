const PENDING = 'pending';
const SUCCESS = 'success';
const ERROR = 'error';
/*
* 1.0解决重复执行resolve或者reject问题及  .then返回值问题
* */
/*
class myPromise {
  constructor(executor){
    this.value = undefined
    this.type = PENDING
    this.onSuccess = []
    this.onError = []
    //处理从pending到success的逻辑
    let resolve = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = SUCCESS
        this.onSuccess.forEach(item=>item(this.value))
      }

    }
    //处理从pending到error的逻辑
    let reject = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = ERROR
        this.onError.forEach(item=>item(this.value))
      }
    }
    //立即执行executor 其中接收两个参数，分别为resolve reject
    executor(resolve,reject)
  }
  then(onSuccess,onError){
    if(this.type === SUCCESS){
      return onSuccess(this.value)
    }
    if(this.type === ERROR){
      return onError(this.value)
    }
    if(this.type === PENDING){
      this.onSuccess.push(()=>{
        onSuccess(this.value)
      })
      this.onError.push(()=>{
        onError(this.value)
      })
    }
  }
}
*/

class myPromise {
  constructor(executor){
    this.value = undefined
    this.type = PENDING
    this.onSuccess = []
    this.onError = []
    //处理从pending到success的逻辑
    let resolve = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = SUCCESS
        this.onSuccess.forEach(item=>item(this.value))
      }

    }
    //处理从pending到error的逻辑
    let reject = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = ERROR
        this.onError.forEach(item=>item(this.value))
      }
    }
    //立即执行executor 其中接收两个参数，分别为resolve reject
    executor(resolve,reject)
  }
  then(onSuccess,onError){
    if(this.type === SUCCESS){
      return onSuccess(this.value)
    }
    if(this.type === ERROR){
      return onError(this.value)
    }
    if(this.type === PENDING){
      this.onSuccess.push(()=>{
        onSuccess(this.value)
      })
      this.onError.push(()=>{
        onError(this.value)
      })
    }
  }
}
export default myPromise