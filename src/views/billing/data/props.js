import { parseTime, numberFormat, dateRangeFormat } from '@/utils'
import { deptDropdown, areaDropdown, accountDropdown, changeTypeDownload } from '@/api/common'

const deptSelectConfig = (vKey = 'id', textKey = 'name') => ({
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item[vKey], label: item[textKey] })
})
const countrySelectConfig = {
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}
const accountSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: accountDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.name, label: item.name })
}
const changeTypeConfig = {
  params: {},
  itemType: 'select',
  selectFetch: changeTypeDownload,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.changeType, label: item.changeType })
}
export const periodFormat = (value, key) => {
  const formatVal = parseTime(value, '{y}-{m}')
  if (formatVal === 'null') {
    return { [key]: null }
  }
  return { [key]: formatVal }
}

export function generateFormater(key, decimalLen = 2) {
  return row => numberFormat(row[key] || 0, decimalLen)
}

export function textFormatter(key) {
  return row => row[key] || '-'
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'orderId', label: '订单号' },
      { prop: 'period', label: '期间', itemType: 'month', format: periodFormat },
      { prop: 'originDate', label: '账单时间', itemType: 'daterange', format: dateRangeFormat },
      { prop: 'countryId', label: '国家', itemType: 'select', ...countrySelectConfig, selectOptions: { multiple: true }},
      { prop: 'accountId', label: '店铺', ...accountSelectConfig, selectOptions: { multiple: true }},
      {
        prop: 'deptId', label: '部门', itemType: 'select', ...deptSelectConfig(), selectOptions: { multiple: true }},
      {
        prop: 'deptGroup', label: '销售小组', itemType: 'select', ...deptSelectConfig('name', 'name'), selectOptions: { multiple: true }},
      { prop: 'companySku', label: '内部型号', placeholder: '多个请用英文逗号隔开' },
      { prop: 'reportType', label: '账单类型' },
      { prop: 'changeType', label: '转换类型', ...changeTypeConfig, selectOptions: { multiple: true }},
      {
        prop: 'monthlyType', label: '数据类型', itemType: 'select', options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '月结' },
          { value: 'N', label: '非月结' }
        ] }
    ]
  },
  columns: [
    { prop: 'accountName', width: 120, align: 'center', label: '店铺名称' },
    { prop: 'country', width: 120, align: 'center', label: '国家' },
    { prop: 'deptName', width: 120, align: 'center', label: '部门' },
    { prop: 'period', width: 120, align: 'center', label: '期间' },
    { prop: 'originDate', width: 150, align: 'center', label: '当地时间', formatter: row => parseTime(row.originDate, '{y}-{m}-{d}') },
    { prop: 'settlementId', width: 150, align: 'center', label: '结算号' },
    { prop: 'type', width: 150, align: 'center', label: '类型' },
    { prop: 'orderId', width: 150, align: 'center', label: '订单号', formatter: textFormatter('orderId') },
    { prop: 'sku', width: 150, align: 'center', label: 'Seller SKU', formatter: textFormatter('sku') },
    { prop: 'description', width: 150, align: 'center', label: '描述' },
    { prop: 'quantity', width: 100, label: '数量', align: 'right', type: 'number', formatter: generateFormater('quantity') },
    { prop: 'marketplace', width: 150, align: 'center', label: '市场', formatter: textFormatter('marketplace') },
    { prop: 'fulfillment', width: 150, align: 'center', label: '发货方式', formatter: textFormatter('fulfillment') },
    { prop: 'orderCity', width: 150, align: 'center', label: '订单城市', formatter: textFormatter('orderCity') },
    { prop: 'orderState', width: 150, align: 'center', label: '所属政区', formatter: textFormatter('orderState') },
    { prop: 'orderPostal', width: 150, align: 'center', label: '邮编', formatter: textFormatter('orderPostal') },
    { prop: 'taxCollectionModel', width: 150, align: 'center', label: '税收模式', formatter: textFormatter('taxCollectionModel') },
    { prop: 'productSales', width: 150, label: '产品销售', align: 'right', type: 'number', formatter: generateFormater('productSales') },
    { prop: 'productSalesTax', width: 150, label: '产品销售税', align: 'right', type: 'number', formatter: generateFormater('productSalesTax') },
    { prop: 'shippingCredits', width: 150, label: '运费', align: 'right', type: 'number', formatter: generateFormater('shippingCredits') },
    { prop: 'shippingCreditsTax', width: 150, label: '运费税', align: 'right', type: 'number', formatter: generateFormater('shippingCreditsTax') },
    { prop: 'giftWrapCredits', width: 150, label: '礼物包装积分', align: 'right', type: 'number', formatter: generateFormater('giftWrapCredits') },
    { prop: 'giftwrapCreditsTax', width: 150, label: '礼物包装积分税', align: 'right', type: 'number', formatter: generateFormater('giftwrapCreditsTax') },
    { prop: 'amazonPointCost', width: 150, label: '亚马逊积分返点', align: 'right', type: 'number', formatter: generateFormater('amazonPointCost') },
    { prop: 'promotionalRebates', width: 150, label: '促销折扣', align: 'right', type: 'number', formatter: generateFormater('promotionalRebates') },
    { prop: 'promotionalRebatesTax', width: 150, label: '促销折扣税', align: 'right', type: 'number', formatter: generateFormater('promotionalRebatesTax') },
    { prop: 'marketplaceWithheldTax', width: 150, label: '市场税', align: 'right', type: 'number', formatter: generateFormater('marketplaceWithheldTax') },
    { prop: 'lowValueGoods', width: 150, label: '低值商品', align: 'right', type: 'number', formatter: generateFormater('lowValueGoods') },
    { prop: 'sellingFees', width: 150, label: '销售费用', align: 'right', type: 'number', formatter: generateFormater('sellingFees') },
    { prop: 'fbaFees', width: 150, label: 'fba运费', align: 'right', type: 'number', formatter: generateFormater('fbaFees') },
    { prop: 'otherTransactionFees', width: 150, label: '其他交易费用', align: 'right', type: 'number', formatter: generateFormater('otherTransactionFees') },
    { prop: 'other', width: 150, label: '其他费用', align: 'right', type: 'number', formatter: generateFormater('other') },
    { prop: 'total', width: 150, label: '总计', align: 'right', type: 'number', formatter: generateFormater('total') },
    { prop: 'totalDifference', width: 150, label: '总计差异', align: 'right', type: 'number', formatter: generateFormater('totalDifference') },
    { prop: 'changeType', width: 150, align: 'center', label: '转换类型' },
    { prop: 'orderRevenueOc', width: 150, label: '订单收入(原币)', align: 'right', type: 'number', formatter: generateFormater('orderRevenueOc') },
    { prop: 'salesRevenueOc', width: 150, label: '销售收入(原币)', align: 'right', type: 'number', formatter: generateFormater('salesRevenueOc') },
    { prop: 'shippingRevenueOc', width: 150, label: '运费收入(原币)', align: 'right', type: 'number', formatter: generateFormater('shippingRevenueOc') },
    { prop: 'salesDiscountOc', width: 150, label: '销售折扣(原币)', align: 'right', type: 'number', formatter: generateFormater('salesDiscountOc') },
    { prop: 'refundOc', width: 150, label: '退款金额(原币)', align: 'right', type: 'number', formatter: generateFormater('refundOc') },
    { prop: 'goodsCompensationOc', width: 160, label: '亚马逊物料赔偿(原币)', align: 'right', type: 'number', formatter: generateFormater('goodsCompensationOc') },
    { prop: 'otherFeeOc', width: 150, label: '手续费(原币)', align: 'right', type: 'number', formatter: generateFormater('otherFeeOc') },
    { prop: 'fbaShippingOc', width: 150, label: 'fba运费(原币)', align: 'right', type: 'number', formatter: generateFormater('fbaShippingOc') },
    { prop: 'fbaRentalOc', width: 150, label: 'fba仓租(原币)', align: 'right', type: 'number', formatter: generateFormater('fbaRentalOc') },
    { prop: 'taxFeeOc', width: 150, label: '税金（原币）', align: 'right', type: 'number', formatter: generateFormater('taxFeeOc') },
    { prop: 'marketplaceTaxOc', width: 150, label: '市场税（原币）', align: 'right', type: 'number', formatter: generateFormater('marketplaceTaxOc') },
    { prop: 'adFeeOc', width: 150, label: '广告费(原币)', align: 'right', type: 'number', formatter: generateFormater('adFeeOc') },
    { prop: 'ldFeeOc', width: 150, label: '广告费-LD(原币)', align: 'right', type: 'number', formatter: generateFormater('ldFeeOc') },
    { prop: 'adCpcOc', width: 150, label: '广告费-CPC(原币)', align: 'right', type: 'number', formatter: generateFormater('adCpcOc') },
    { prop: 'couponFeeOc', width: 150, label: '广告费-CPUPON(原币)', align: 'right', type: 'number', formatter: generateFormater('couponFeeOc') },
    { prop: 'adTaxOc', width: 150, label: '广告费税费(原币)', align: 'right', type: 'number', formatter: generateFormater('adTaxOc') },
    { prop: 'vatOc', width: 150, label: 'VAT（原币）', align: 'right', type: 'number', formatter: generateFormater('vatOc') },
    { prop: 'transferOc', width: 150, label: '转款(原币)', align: 'right', type: 'number', formatter: generateFormater('transferOc') },
    { prop: 'creditCardOc', width: 150, label: '信用卡扣款(原币)', align: 'right', type: 'number', formatter: generateFormater('creditCardOc') },
    { prop: 'currency', width: 150, align: 'center', label: '币别' },
    { prop: 'exchangeRate', width: 100, label: '汇率', align: 'right', formatter: generateFormater('exchangeRate') },
    { prop: 'orderRevenueCny', width: 150, label: '订单收入(本位币)', align: 'right', type: 'number', formatter: generateFormater('orderRevenueCny') },
    { prop: 'salesRevenueCny', width: 150, label: '销售收入(本位币)', align: 'right', type: 'number', formatter: generateFormater('salesRevenueCny') },
    { prop: 'shippingTevenueCny', width: 150, label: '运费收入(本位币)', align: 'right', type: 'number', formatter: generateFormater('shippingTevenueCny') },
    { prop: 'salesDiscountCny', width: 150, label: '销售折扣(本位币)', align: 'right', type: 'number', formatter: generateFormater('salesDiscountCny') },
    { prop: 'refundCny', width: 150, label: '退款金额(本位币)', align: 'right', type: 'number', formatter: generateFormater('refundCny') },
    { prop: 'goodsCompensationCny', width: 160, label: '亚马逊物料赔偿(本位币)', align: 'right', type: 'number', formatter: generateFormater('goodsCompensationCny') },
    { prop: 'otherFeeCny', width: 150, label: '手续费(本位币)', align: 'right', type: 'number', formatter: generateFormater('otherFeeCny') },
    { prop: 'fbaShippingCny', width: 150, label: 'fba运费(本位币)', align: 'right', type: 'number', formatter: generateFormater('fbaShippingCny') },
    { prop: 'fbaRentalCny', width: 150, label: 'fba仓租(本位币)', align: 'right', type: 'number', formatter: generateFormater('fbaRentalCny') },
    { prop: 'taxFeeCny', width: 150, label: '税金（本位币）', align: 'right', type: 'number', formatter: generateFormater('taxFeeCny') },
    { prop: 'marketplaceTaxCny', width: 150, label: '市场税（本位币）', align: 'right', type: 'number', formatter: generateFormater('marketplaceTaxCny') },
    { prop: 'adFeeCny', width: 150, label: '广告费(本位币)', align: 'right', type: 'number', formatter: generateFormater('adFeeCny') },
    { prop: 'ldFeeCny', width: 150, label: '广告费-LD(本位币)', align: 'right', type: 'number', formatter: generateFormater('ldFeeCny') },
    { prop: 'adCpcCny', width: 150, label: '广告费-CPC(本位币)', align: 'right', type: 'number', formatter: generateFormater('adCpcCny') },
    { prop: 'couponFeeCny', width: 180, label: '广告费-CPUPON(本位币)', align: 'right', type: 'number', formatter: generateFormater('couponFeeCny') },
    { prop: 'adTaxCny', width: 150, label: '广告费税费(本位币)', align: 'right', type: 'number', formatter: generateFormater('adTaxCny') },
    { prop: 'vatCny', width: 150, label: 'VAT（本位币）', align: 'right', type: 'number', formatter: generateFormater('vatCny') },
    { prop: 'transferCny', width: 150, label: '转款(本位币)', align: 'right', type: 'number', formatter: generateFormater('transferCny') },
    { prop: 'creditCardCny', width: 150, label: '信用卡扣款(本位币)', align: 'right', type: 'number', formatter: generateFormater('creditCardCny') },
    { prop: 'companySku', width: 150, label: '内部型号', align: 'center', formatter: textFormatter('companySku') },
    { prop: 'deptGroup', width: 120, label: '销售小组', align: 'center', formatter: textFormatter('deptGroup') },
    { prop: 'purchaseCost', width: 120, label: '采购成本', align: 'right', type: 'number', formatter: generateFormater('purchaseCost') },
    { prop: 'headTripFee', width: 120, label: '头程运费', align: 'right', type: 'number', formatter: generateFormater('headTripFee') },
    { prop: 'transportFee', width: 120, label: '转运运费', align: 'right', type: 'number', formatter: generateFormater('transportFee') },
    { prop: 'selfShipmentFee', width: 120, label: '自发货运费', align: 'right', type: 'number', formatter: generateFormater('selfShipmentFee') }
  ]
}
