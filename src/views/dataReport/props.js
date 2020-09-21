
export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'orderId', label: '订单号' }
    ]
  },
  columns: [
    { label: '期间', width: 150, prop: 'period' },
    { label: '店铺名称', width: 150, prop: 'accountName' },
    { label: '国家', width: 150, prop: 'country' },
    { label: '币别', width: 150, prop: 'currency' },
    { label: '汇率', width: 150, prop: 'exchangeRate' },
    { label: '公司型号', width: 150, prop: 'companySku' },
    { label: '销售小组', width: 150, prop: 'deptGroup' },
    { label: '数量', width: 150, prop: 'quantity' },
    { label: '销售收入（原币）', width: 150, prop: 'salesRevenueOc' },
    { label: '运费收入（原币）', width: 150, prop: 'shippingRevenueOc' },
    { label: '销售折扣（原币）', width: 150, prop: 'salesDiscountOc' },
    { label: '退款金额（原币）', width: 150, prop: 'refundOc' },
    { label: '亚马逊物料赔偿（原币）', width: 180, prop: 'goodsCompensationOc' },
    { label: '手续费（原币）', width: 150, prop: 'otherFeeOc' },
    { label: 'fba运费（原币）', width: 150, prop: 'fbaShippingOc' },
    { label: 'fba仓租（原币）', width: 150, prop: 'fbaRentalOc' },
    { label: '广告费（原币）', width: 150, prop: 'adFeeOc' },
    { label: '广告费税金（原币）', width: 150, prop: 'adTaxOc' },
    { label: '税金（原币）', width: 150, prop: 'taxFeeOc' },
    { label: '市场税（原币）', width: 150, prop: 'marketplaceTaxOc' },
    { label: 'VAT（原币）', width: 150, prop: 'vatOc' },
    { label: '转款（原币）', width: 150, prop: 'transferOc' },
    { label: '信用卡扣款（原币）', width: 150, prop: 'creditCardOc' },
    { label: '含税利润（原币）', width: 150, prop: 'includingTaxProfitOc' },
    { label: '不含税利润（原币）', width: 150, prop: 'excludingTaxProfitOc' },
    { label: '销售收入（本位币）', width: 150, prop: 'salesRevenueCny' },
    { label: '运费收入（本位币）', width: 150, prop: 'shippingRevenueCny' },
    { label: '销售折扣（本位币）', width: 150, prop: 'salesDiscountCny' },
    { label: '退款金额（本位币）', width: 150, prop: 'refundCny' },
    { label: '亚马逊物料赔偿（本位币）', width: 180, prop: 'goodsCompensationCny' },
    { label: '手续费（本位币）', width: 150, prop: 'otherFeeCny' },
    { label: 'fba运费（本位币）', width: 150, prop: 'fbaShippingCny' },
    { label: 'fba仓租（本位币）', width: 150, prop: 'fbaRentalCny' },
    { label: '广告费（本位币）', width: 150, prop: 'adFeeCny' },
    { label: '广告费税金（本位币）', width: 150, prop: 'adTaxCny' },
    { label: '税金（本位币）', width: 150, prop: 'taxFeeCny' },
    { label: '市场税（本位币）', width: 150, prop: 'marketplaceTaxCny' },
    { label: 'VAT（本位币）', width: 150, prop: 'vatCny' },
    { label: '转款（本位币）', width: 150, prop: 'transferCny' },
    { label: '信用卡扣款（本位币）', width: 150, prop: 'creditCardCny' },
    { label: '含税利润（本位币）', width: 150, prop: 'includingTaxProfitCny' },
    { label: '不含税利润（本位币）', width: 150, prop: 'excludingTaxProfitCny' }
  ]
}
