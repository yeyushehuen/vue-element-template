import request from '@/utils/request'

/** ******************** 货币管理 *********************/
/* 新增 */
export function addCurrency(data) {
  return request({
    url: '/currency/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateCurrency(data) {
  return request({
    url: '/currency/add',
    method: 'put',
    data
  })
}
