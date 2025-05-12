import { useUserStore } from "@/stores/user";

export default {
  install: (app, options) => {
    app.config.globalProperties.$stores = window.$stores = {
      user: useUserStore(),
    };
  },
};
