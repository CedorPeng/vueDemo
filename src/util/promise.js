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
        this.onSuccess.forEach(item=>item())
      }

    }
    //处理从pending到error的逻辑
    let reject = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = ERROR
        this.onError.forEach(item=>item())
      }
    }
    //立即执行executor 其中接收两个参数，分别为resolve reject
    executor(resolve,reject)
  }
  then(onSuccess,onError){
    if(this.type === SUCCESS){
      onSuccess(this.value)
    }
    if(this.type === ERROR){
      onError(this.value)
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
/*
* 1.1 将new的promise作为变量继续执行then方法
* promise的then返回一个new Promise，能继续执行then方法
* */
/*class myPromise {
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
        this.onSuccess.forEach(item=>item())
      }

    }
    //处理从pending到error的逻辑
    let reject = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = ERROR
        this.onError.forEach(item=>item())
      }
    }
    //立即执行executor 其中接收两个参数，分别为resolve reject
    executor(resolve,reject)
  }
  then(onSuccess,onError){
    let promise = new myPromise((resolve,reject)=>{
      if(this.type === SUCCESS){
        let x = onSuccess(this.value)
        resolve(x)
      }
      if(this.type === ERROR){
        let x = onError(this.value)
        resolve(x)
      }
      if(this.type === PENDING){
        this.onSuccess.push(()=>{
          let x = onSuccess(this.value)
          resolve(x)
        })
        this.onError.push(()=>{
          let x = onSuccess(this.value)
          resolve(x)
          // onError(this.value)
        })
      }

    })
    return promise
  }
}*/

/*
* 2.0
* a，解决在将new promise作为参数return之后 新的then方法中的success接收的参数为 promise 并不会执行
* b，解决在将p1作为参数return之后 promise 报的错误
* */
function resolvePromise(x, promise, resolve, reject) {
  if (x === promise) {
    reject(new Error('Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'function' || typeof x === 'object') {
    let then = x.then;
    if (then && typeof then === 'function') {
      //假设x是一个promise
      x.then(y => {
        resolvePromise(y, promise, resolve, reject)
      }, r => {
        reject(r)
      })
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

class myPromise {
  constructor(executor) {
    this.value = undefined
    this.type = PENDING
    this.onSuccess = []
    this.onError = []
    //处理从pending到success的逻辑
    let resolve = value => {
      if (this.type === PENDING) {
        this.value = value
        this.type = SUCCESS
        this.onSuccess.forEach(item => item())
      }

    }
    //处理从pending到error的逻辑
    let reject = value => {
      if (this.type === PENDING) {
        this.value = value
        this.type = ERROR
        this.onError.forEach(item => item())
      }
    }
    //立即执行executor 其中接收两个参数，分别为resolve reject
    executor(resolve, reject)
  }

  then(onSuccess, onError) {
    let promise = new myPromise((resolve, reject) => {
      if (this.type === SUCCESS) {
        let x = onSuccess(this.value)
        resolvePromise(x, promise, resolve, reject)
      }
      if (this.type === ERROR) {
        let x = onError(this.value)
        resolvePromise(x, promise, resolve, reject)
      }
      if (this.type === PENDING) {
        this.onSuccess.push(() => {
          let x = onSuccess(this.value)
          resolvePromise(x, promise, resolve, reject)
        })
        this.onError.push(() => {
          let x = onError(this.value)
          resolvePromise(x, promise, resolve, reject)
        })
      }

    })
    return promise
  }
}

export default myPromise


/*
* 一样的，整体写一遍加深印象
* */
/*
function resolvePromise(x,promise,resolve,reject) {
  if(x === promise){
    reject(new Error('this is error<promise>'))
  }
  if(typeof x === 'function' || typeof x === 'object'){
    let then = x.then
    if(typeof then === 'function'){
      x.then(s => {
        resolvePromise(s,promise,resolve,reject)
      },e => {
        reject(e)
      })
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }

}

class myPromise {
  constructor(fn) {
    this.value = undefined
    this.type = PENDING
    this.onSucess = []
    this.onError = []
    let resolve = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = SUCCESS
        this.onSucess.forEach(item=>item())
      }
    }
    let reject = value => {
      if(this.type === PENDING){
        this.value = value
        this.type = ERROR
        this.onError.forEach(item=>item())
      }
    }
    fn(resolve,reject)
  }
  then(onSuccess,onError){
    let promise = new myPromise((resolve,reject)=>{
      if(this.type === SUCCESS){
        let x = onSuccess(this.value)
        resolvePromise(x,promise,resolve,reject)
      }
      if(this.type === ERROR){
        let x = onError(this.value)
        resolvePromise(x,promise,resolve,reject)
      }
      if(this.type === PENDING){
        this.onSucess.push(()=>{
          let x = onSuccess(this.value)
          resolvePromise(x,promise,resolve,reject)
        })
        this.onError.push(()=>{
          let x = onError(this.value)
          resolvePromise(x,promise,resolve,reject)
        })

      }
    })
    return promise

  }

}
export default myPromise
*/




































