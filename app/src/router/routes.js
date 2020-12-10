
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/lul', component: () => import('pages/OverviewTeacher.vue') },
      { path: '/sus', component: () => import('pages/OverviewStudent.vue') },
      { path: '/lul/checkliste', component: () => import('pages/ChecklistTeacher.vue') },
      { path: '/artikel/:id', component: () => import('pages/Article.vue') }
    ]
  },




  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
