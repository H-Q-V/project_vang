import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        requiresLogin: true,
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/layouts/layoutAuth.vue"),
      children: [
        {
          path: "",
          name: "login",
          component: () => import("@/views/auth/login.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/auth/register.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!token) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

window.$router = router;
export default router;
