import request from '@/utils/request'

/** ******************** 账单详情 *********************/
/** 审核 */
export function paymentReportVerify(data) {
  return request({
    url: '/paymentReport/verify',
    method: 'post',
    data
  })
}
/** 反审核 */
export function paymentReportUnverify(data) {
  return request({
    url: '/paymentReport/unverify',
    method: 'post',
    data
  })
}
/** 清除 */
export function paymentReportClear(data) {
  return request({
    url: '/paymentReport/clear',
    method: 'post',
    data
  })
}

/** ******************** 数据详情 *********************/
/** 重算钮功能 */
export function billDataReconciliation({ data } = {}) {
  return request({
    url: '/paymentAnalysis/reinit',
    method: 'post',
    data
  })
}
/** 汇总按钮功能 */
export function billDataSummary({ data } = {}) {
  return request({
    url: '/paymentAnalysis/summary',
    method: 'post',
    data
  })
}
/** 全部合计接口 */
export async function billDataAllsum(query) {
  return request({
    url: '/paymentAnalysis/allsum',
    method: 'get',
    params: query
  })
}

/** ******************** 数据汇总 *********************/
/** 结账 */
export function paymentSummaryCheckout(data) {
  return request({
    url: '/paymentSummary/checkout',
    method: 'post',
    data
  })
}
/** 反结账 */
export function paymentSummaryRecheckout(data) {
  return request({
    url: '/paymentSummary/recheckout',
    method: 'post',
    data
  })
}
/** 全部合计接口 */
export async function paymentSummaryPushEAS(data) {
  return request({
    url: '/paymentSummary/voucher',
    method: 'post',
    data
  })
}
