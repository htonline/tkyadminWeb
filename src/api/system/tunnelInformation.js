import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tunnelInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tunnelInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tunnelInformation',
    method: 'put',
    data
  })
}

export function select(data) {
  return request({
    url: 'api/tunnelInformation/select',
    method: 'post',
    data
  })
}
export function downloadFile(data) {
  return request({
    url: 'api/tunnelInformation/downloadFile',
    method: 'post',
    data
  })
}
export function changeStatue(data) {
  return request({
    url: 'api/tunnelInformation/changeStatue',
    method: 'put',
    data
  })
}
export function selectByStatue() {
  return request({
    url: 'api/tunnelInformation/selectByStatue',
    method: 'get'
  })
}
export function selectByStatueFenye() {
  return request({
    url: 'api/tunnelInformation/selectByStatueFenye',
    method: 'get'
  })
}
export function selectByTunnelName(tunnelName) {
  return request({
    url: 'api/tunnelInformation/selectByTunnelName',
    method: 'post',
    data: tunnelName
  })
}

export default { add, edit, del, select, changeStatue, selectByStatue, selectByStatueFenye, selectByTunnelName }
