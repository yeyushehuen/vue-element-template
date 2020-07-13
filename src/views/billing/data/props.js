import { monthRangeFormat } from '@/utils'
import { deptDropdown, areaDropdown } from '@/api/common'

const deptSelectConfig = {
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}
const countrySelectConfig = {
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'orderId', label: '订单号' },
      { prop: 'period', label: '期间', itemType: 'month' },
      { prop: 'mobile', label: '账单时间', itemType: 'monthrange', format: monthRangeFormat },
      { prop: 'countryId', label: '国家', itemType: 'select', ...countrySelectConfig, selectOptions: { multiple: true }},
      {
        prop: 'accountId', label: '店铺', itemType: 'select', options: [] },
      {
        prop: 'departmentId', label: '部门', itemType: 'select', ...deptSelectConfig },
      {
        prop: 'monthlyType', label: '数据类型' },
      { prop: 'reportType', label: '账单类型' },
      { prop: 'changeType', label: '转换类型' }
    ]
  },
  columns: [
    { prop: 'accountId', width: 150, label: '店铺名称' },
    { prop: 'sellerCountry', width: 150, label: '国家' },
    { prop: 'deptName', width: 150, label: '部门' },
    { prop: 'period', width: 150, label: '期间' },
    { prop: 'originDate', width: 150, label: '当地时间' },
    { prop: 'unifyDate', width: 150, label: '转换时间' },
    { prop: '7', width: 150, label: '结算号' },
    { prop: 'type', width: 150, label: '类型' },
    { prop: 'orderId', width: 150, label: '订单号' },
    { prop: 'sellerSku', width: 150, label: 'Seller SKU' },
    { prop: 'description', width: 150, label: '描述' },
    { prop: 'quantity', width: 150, label: '数量' },
    { prop: 'marketplace', width: 150, label: '市场' },
    { prop: 'fulfillment', width: 150, label: '发货方式' },
    { prop: 'orderCity', width: 150, label: '订单城市' },
    { prop: 'orderState', width: 150, label: '所属政区' },
    { prop: 'orderPostal', width: 150, label: '邮编' },
    { prop: 'taxCollectionModel', width: 150, label: '税收模式' },
    { prop: 'productSales', width: 150, label: '产品销售' },
    { prop: 'productSalesTax', width: 150, label: '产品销售税' },
    { prop: 'shippingCredits', width: 150, label: '运费' },
    { prop: 'shippingCreditsTax', width: 150, label: '运费税' },
    { prop: 'giftWrapCredits', width: 150, label: '礼物包装积分' },
    { prop: 'giftwrapCreditsTax', width: 150, label: '礼物包装积分税' },
    { prop: 'amazonPointCost', width: 150, label: '亚马逊积分返点' },
    { prop: 'promotionalRebates', width: 150, label: '促销折扣' },
    { prop: 'promotionalRebatesTax', width: 150, label: '促销折扣税' },
    { prop: 'marketplaceWithheldTax', width: 150, label: '市场税' },
    { prop: 'lowValueGoods', width: 150, label: '低值商品' },
    { prop: 'sellingFees', width: 150, label: '销售费用' },
    { prop: 'fbaFees', width: 150, label: 'fba运费' },
    { prop: 'otherTransactionFees', width: 150, label: '其他交易费用' },
    { prop: 'other', width: 150, label: '其他费用' },
    { prop: 'total', width: 150, label: '总计' },
    { prop: 'totalDifference', width: 150, label: '总计差异' },
    { prop: 'changeType', width: 150, label: '转换类型' },
    { prop: 'orderRevenueOc', width: 150, label: '订单收入(原币)' },
    { prop: 'salesRevenueOc', width: 150, label: '销售收入(原币)' },
    { prop: 'shippingRevenueOc', width: 150, label: '运费收入(原币)' },
    { prop: 'salesDiscountOc', width: 150, label: '销售折扣(原币)' },
    { prop: 'refundOc', width: 150, label: '退款金额(原币)' },
    { prop: 'goodsCompensationOc', width: 160, label: '亚马逊物料赔偿(原币)' },
    { prop: 'otherFeeOc', width: 150, label: '手续费(原币)' },
    { prop: 'fbaShippingOc', width: 150, label: 'fba运费(原币)' },
    { prop: 'fbaRentalOc', width: 150, label: 'fba仓租(原币)' },
    { prop: 'taxFeeOc', width: 150, label: '税金（原币）' },
    { prop: 'marketplaceTaxOc', width: 150, label: '市场税（原币）' },
    { prop: 'adFeeOc', width: 150, label: '广告费(原币)' },
    { prop: 'adTaxOc', width: 150, label: '广告费税费(原币)' },
    { prop: 'transferOc', width: 150, label: '转款(原币)' },
    { prop: 'creditCardOc', width: 150, label: '信用卡扣款(原币)' },
    { prop: 'currency', width: 150, label: '币别' },
    { prop: 'exchangeRate', width: 150, label: '汇率' },
    { prop: 'orderRevenueCny', width: 150, label: '订单收入(本位币)' },
    { prop: 'salesRevenueCny', width: 150, label: '销售收入(本位币)' },
    { prop: 'shippingTevenueCny', width: 150, label: '运费收入(本位币)' },
    { prop: 'salesDiscountCny', width: 150, label: '销售折扣(本位币)' },
    { prop: 'refundCny', width: 150, label: '退款金额(本位币)' },
    { prop: 'goodsCompensationCny', width: 160, label: '亚马逊物料赔偿(本位币)' },
    { prop: 'otherFeeCny', width: 150, label: '手续费(本位币)' },
    { prop: 'fbaShippingCny', width: 150, label: 'fba运费(本位币)' },
    { prop: 'fbaRentalCny', width: 150, label: 'fba仓租(本位币)' },
    { prop: 'taxFeeCny', width: 150, label: '税金（本位币）' },
    { prop: 'marketplaceTaxCny', width: 150, label: '市场税（本位币）' },
    { prop: 'adFeeCny', width: 150, label: '广告费(本位币)' },
    { prop: 'adTaxCny', width: 150, label: '广告费税费(本位币)' },
    { prop: 'transferCny', width: 150, label: '转款(本位币)' },
    { prop: 'creditCardCny', width: 150, label: '信用卡扣款(本位币)' },
    { prop: 'companySku', width: 150, label: '公司型号' },
    { prop: 'purchaseCost', width: 150, label: '采购成本' },
    { prop: 'headTripFee', width: 150, label: '头程运费' },
    { prop: 'transportFee', width: 150, label: '转运运费' },
    { prop: 'selfShipmentFee', width: 150, label: '自发货运费' }
  ]
}
