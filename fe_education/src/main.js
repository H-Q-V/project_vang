import { createApp } from "vue";
import "./style.css";
import api from "./helper/api";
import router from "./router";
import App from "./App.vue";
import bottomNavigationVue from "bottom-navigation-vue";
import "bottom-navigation-vue/dist/style.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import Checkbox from "primevue/checkbox";
import PanelMenu from "primevue/panelmenu";
import DataView from "primevue/dataview";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

createApp(App)
  .use(router)
  .use(bottomNavigationVue)
  .use(api)
  .use(ToastService)
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
  .component("Checkbox", Checkbox)
  .component("Button", Button)
  .component("PanelMenu", PanelMenu)
  .component("DataView", DataView)
  .component("Accordion", Accordion)
  .component("AccordionPanel", AccordionPanel)
  .component("AccordionHeader", AccordionHeader)
  .component("AccordionContent", AccordionContent)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("ColumnGroup", ColumnGroup)
  .component("Row", Row)
  .component("Toast", Toast)
  .mount("#app");
