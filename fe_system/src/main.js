import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "./style.css";
import { createPinia } from "pinia";
import api from "@/helper/api";
import store from "@/library/store";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(store)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: "",
        cssLayer: false,
      },
    },
  })
  .use(api)
  .mount("#app");
