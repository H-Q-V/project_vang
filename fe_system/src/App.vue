<script setup>
import { ref, onMounted } from "vue";

const userStore = window.$stores.user;

function getQueryParam(param) {
  let queryString;

  queryString = window.location.search;

  if (queryString) {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  }
  return null;
}

onMounted(async () => {
  console.log("hi");
  const token = getQueryParam("token");

  if (token) {
    localStorage.setItem("token", token);
    const dataUser = await window.$api.call("users/info");
    if (dataUser.status === "success") {
      userStore.updateUser(dataUser.user);
      dataUser.user = JSON.stringify(dataUser.user);
      localStorage.setItem("user", dataUser.user);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.$router.push({ name: "login" });
    }
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
./helper/account
