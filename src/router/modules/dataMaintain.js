/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dataMaintainRouter = {
  path: '/datamaintain',
  component: Layout,
  redirect: '/datamaintain/conversion',
  alwaysShow: true, // will always show the root menu
  name: '数据维护',
  meta: {
    title: '数据维护',
    icon: 'lock'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'conversion',
      component: () => import('@/views/datamaintain/conversion'),
      name: 'type类型转换',
      meta: {
        title: 'type类型转换'
        // roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'relationship',
      component: () => import('@/views/datamaintain/relationship'),
      name: 'Seller Sku 关系维护',
      meta: {
        title: 'Seller Sku 关系维护'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'rate',
      component: () => import('@/views/datamaintain/rate'),
      name: '汇率数据',
      meta: {
        title: '汇率数据'
        // roles: ['admin']
      }
    }
  ]
}

export default dataMaintainRouter
