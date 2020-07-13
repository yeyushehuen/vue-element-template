import request from '@/utils/request'

/** ******************** 账单详情 *********************/
/** 账单审核 */
export function paymentReportVerify({ data } = {}) {
  return request({
    url: '/paymentReport/verify',
    method: 'post',
    data
  })
}
/** 反审核 */
export function paymentReportUnverify({ data } = {}) {
  return request({
    url: '/paymentReport/unverify',
    method: 'post',
    data
  })
}

/** ******************** 数据详情 *********************/
/** 重算 */
export function billDataReconciliation({ data } = {}) {
  return request({
    url: '/paymentAnalysis/reconciliation',
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
