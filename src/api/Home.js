import {HTTP} from '../util/axios'

export const getPostValue = (data) => {
  return HTTP({
    url:'/test/test/getValue',
    method:'post',
    data
  })
}
export const getGetValue = (data) => {
  return HTTP({
    url:'/test/test/getValue',
    method:'get',
    data
  })
}
