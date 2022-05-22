import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/detectionInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/detectionInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/detectionInformation',
    method: 'put',
    data
  })
}
export function generator(data, type) {
  return request({
    url: 'api/detectionInformation/' + type,
    method: 'post',
    data,
    responseType: type === 2 ? 'blob' : 'blob'
  })
}
export function updateDetectionPhotos(){

}
export default { add, edit, del }
