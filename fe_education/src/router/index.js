import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "",
      name: "LayoutMain",
      component: () => import("@/layouts/layoutMain.vue"),
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/HomePage.vue"),
        },
      ],
    },
    {
      path: "",
      name: "LayoutDetail",
      component: () => import("@/layouts/layoutDetail.vue"),
      children: [
        {
          path: "upcoming",
          name: "upcoming",
          component: () => import("@/views/UpcomingDetail.vue"),
        },
        {
          path: "Test",
          name: "Test",
          component: () => import("@/views/Test.vue"),
        },
        {
          path: "/notification",
          name: "notification",
          component: () => import("@/components/Score.vue"),
        },
        {
          path: "overdue",
          name: "overdue",
          component: () => import("@/views/OverdueDetail.vue"),
        },
      ],
    },
    {
      path: "",
      name: "LayoutProfile",
      component: () => import("@/layouts/layoutProfile.vue"),
      children: [
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/profile.vue"),
        },
      ],
    },
  ],
});

window.$router = router;
export default router;
