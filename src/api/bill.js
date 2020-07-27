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
/** 重算 */
export function billDataReconciliation({ data } = {}) {
  debugger
  return request({
    url: '/paymentAnalysis/reinit',
    method: 'post',
    data
  })
}
/** 汇总 */
export function billDataSummary({ data } = {}) {
  return request({
    url: '/paymentAnalysis/summary',
    method: 'post',
    data
  })
}

/** ******************** 数据汇总 *********************/
/** 结账 */
export function paymentSummaryCheckout(data) {
  debugger
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
