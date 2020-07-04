/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const baseInfoRouter = {
  path: '/baseinfo',
  component: Layout,
  redirect: '/baseinfo/area',
  alwaysShow: true, // will always show the root menu
  name: '基础资料',
  meta: {
    title: '基础资料',
    icon: 'el-icon-document'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'money',
      component: () => import('@/views/baseinfo/money'),
      name: '货币管理',
      meta: {
        title: '货币管理'
        // roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'area',
      component: () => import('@/views/baseinfo/area'),
      name: '区域管理',
      meta: {
        title: '区域管理'
        // roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'department',
      component: () => import('@/views/baseinfo/department'),
      name: '部门管理',
      meta: {
        title: '部门管理'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'salesentity',
      component: () => import('@/views/baseinfo/salesentity'),
      name: '销售主体',
      meta: {
        title: '销售主体'
        // roles: ['admin']
      }
    },
    {
      path: 'shop',
      component: () => import('@/views/baseinfo/shop'),
      name: '店铺管理',
      meta: {
        title: '店铺管理'
        // roles: ['admin']
      }
    },
    {
      path: 'reporttype',
      component: () => import('@/views/baseinfo/reporttype'),
      name: '报表类型',
      meta: {
        title: '报表类型'
        // roles: ['admin']
      }
    },
    {
      path: 'scheduledtask',
      component: () => import('@/views/baseinfo/scheduledtask'),
      name: '计划任务',
      meta: {
        title: '计划任务',
        roles: ['admin']
      }
    }
  ]
}

export default baseInfoRouter
