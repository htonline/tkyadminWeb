import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/deviceInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/deviceInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/deviceInformation',
    method: 'put',
    data
  })
}
export function selectPhotos(data) {
  return request({
    url: 'api/deviceInformation/selectPhotos',
    method: 'post',
    data
  })
}
export function selectdeviceCertificate(data) {
  return request({
    url: 'api/deviceInformation/selectdeviceCertificate',
    method: 'post',
    data
  })
}
export default { add, edit, del, selectPhotos, selectdeviceCertificate }
