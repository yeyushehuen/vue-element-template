/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const billingRouter = {
  path: '/billing',
  component: Layout,
  redirect: '/billing/detail',
  alwaysShow: true, // will always show the root menu
  name: '账单情况',
  meta: {
    title: '账单情况',
    icon: 'el-icon-money'
  },
  children: [
    {
      path: 'detail',
      component: () => import('@/views/billing/detail'),
      name: 'BillingDetail',
      meta: {
        title: '账单详情',
        affix: true
      }
    },
    {
      path: 'data',
      component: () => import('@/views/billing/data'),
      name: 'BillingData',
      meta: {
        title: '数据详情'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'summary',
      component: () => import('@/views/billing/summary'),
      name: 'BillingSummary',
      meta: {
        title: '数据汇总'
      }
    }
  ]
}

export default billingRouter
