// stores/counter.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { user: null };
  },

  actions: {
    updateUser(dataUser) {
      this.user = dataUser
        ? dataUser
        : JSON.parse(localStorage.getItem("user"));
    },
  },
});
