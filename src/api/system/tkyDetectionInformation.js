import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tkyDetectionInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tkyDetectionInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tkyDetectionInformation',
    method: 'put',
    data
  })
}

export function uploadDZSdata(data) {
  return request({
    url: 'api/tkyDetectionInformation/uploadDZSdata',
    method: 'post',
    data
  })
}

export function generator(data, type) {
  return request({
    url: 'api/tkyDetectionInformation/' + type,
    method: 'post',
    data,
    responseType: type === 2 ? 'blob' : 'blob'
  })
}
export default { add, edit, del }
