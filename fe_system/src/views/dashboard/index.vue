<template>
  <div>dashboard</div>
  <div>
    <!-- <RouterLink :to="{ name: 'login' }" class="text-[black]"
      >vào route đăng nhập</RouterLink
    > -->
    <p v-if="userInfo">xin chào {{ userInfo?.name }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const userStore = window.$stores.user;
const userInfo = ref(null);

watch(
  () => userStore.user,
  (newValue) => {
    if (newValue) {
      userInfo.value = userStore.user;
    }
  }
);

onMounted(async () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("token");
  window.history.replaceState({}, document.title, url.pathname + url.search);
  userStore.updateUser();
});
</script>

<style scoped></style>
