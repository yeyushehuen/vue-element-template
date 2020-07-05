import request from '@/utils/request'

/** ******************** 账单详情 *********************/
/* 新增 */
export function addPaymentReport({ data } = {}) {
  return request({
    url: '/paymentReport/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updatePaymentReport({ id, data } = {}) {
  debugger
  return request({
    url: `/paymentReport/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deletePaymentReport(id) {
  return request({
    url: `/paymentReport/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getPaymentReportById(id) {
  return request({
    url: '/paymentReport/getById',
    method: 'get',
    params: { id }
  })
}

/** ******************** 数据详情 *********************/
/* 新增 */
export function addPaymentAnalysis({ data } = {}) {
  return request({
    url: '/paymentAnalysis/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updatePaymentAnalysis({ id, data } = {}) {
  return request({
    url: `/paymentAnalysis/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deletePaymentAnalysis(id) {
  return request({
    url: `/paymentAnalysis/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getAreaById(id) {
  return request({
    url: '/paymentAnalysis/getById',
    method: 'get',
    params: { id }
  })
}