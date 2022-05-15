import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/testInformation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/testInformation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/testInformation',
    method: 'put',
    data
  })
}

export function createTest(data) {
  return request({
    url: 'api/testInformation/createTest',
    method: 'post',
    data
  })
}
export function editForm(data) {
  return request({
    url: 'api/testInformation',
    method: 'put',
    data
  })
}
export function jilieditForm(data) {
  return request({
    url: 'api/testInformation/jiliupdateTestInformation',
    method: 'put',
    data
  })
}
export function jianceeditForm(data) {
  return request({
    url: 'api/testInformation/jianceupdateTestInformation',
    method: 'put',
    data
  })
}
export function delForm(ids) {
  return request({
    url: 'api/testInformation/delForm',
    method: 'post',
    data: ids
  })
}
export function listDishesInfo() {
  return request({
    url: 'api/testInformation/listDishesInfo',
    method: 'post'
  })
}
export function listDishesInfo1() {
  return request({
    url: 'api/testInformation/listDishesInfo1',
    method: 'post'
  })
}
export function createErweima(data) {
  return request({
    url: 'api/testInformation/createErweima',
    method: 'post',
    data
  })
}
export function listDishesInfoTianxian() {
  return request({
    url: 'api/testInformation/listDishesInfoTianxian',
    method: 'post'
  })
}
export function listDishesInfoZhuji() {
  return request({
    url: 'api/testInformation/listDishesInfoZhuji',
    method: 'post'
  })
}
export default { add, edit, del, createTest, editForm, delForm, listDishesInfo, listDishesInfo1, createErweima, listDishesInfoTianxian, listDishesInfoZhuji, jilieditForm, jianceeditForm }
