const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
      {
        path: "/lul",
        name: "lul",
        component: () => import("pages/OverviewTeacher.vue")
      },
      {
        path: "/sus",
        name: "sus",
        component: () => import("pages/OverviewStudent.vue")
      },
      {
        path: "/artikel/:id",
        name: "article",
        component: () => import("pages/Article.vue")
      },
      {
        path: "/kategorie/:id",
        name: "category",
        component: () => import("pages/Category.vue")
      },
      { path: "/tests", component: () => import("pages/Tests.vue") },
      {
        path: "/suche",
        name: "search",
        component: () => import("pages/Search.vue")
      },
      {
        path: "/datenschutz",
        component: () => import("pages/PrivacyPolicy.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
