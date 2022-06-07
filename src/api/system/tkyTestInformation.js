import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tkyTestInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tkyTestInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tkyTestInformation',
    method: 'put',
    data
  })
}

export function getData() {
  return request({
    url: 'demo/sd_projectinspectiondeclaration/getWaitSubmitList',
    method: 'get',
    headers: {
      'CRBIMUID': '369364'
    }
  })
}

export function syntkydata(data) {
  return request({
    url: 'api/tkyTestInformation/syntkydata',
    method: 'post',
    data
  })
}
export function createErweima(data) {
  return request({
    url: 'api/tkyTestInformation/createErweima',
    method: 'post',
    data
  })
}
export default { add, edit, del, createErweima }
