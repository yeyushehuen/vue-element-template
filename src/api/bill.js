import request from '@/utils/request'

/** ******************** 账单详情 *********************/
// /paymentReport/download 下载
// /paymentReport/upload 上传账单
// /paymentReport/verify 审核
export function paymentReportVerify({ data } = {}) {
  return request({
    url: '/paymentReport/verify',
    method: 'post',
    data
  })
}
// /paymentReport/unverify 反审核
export function paymentReportUnverify({ data } = {}) {
  return request({
    url: '/paymentReport/unverify',
    method: 'post',
    data
  })
}
