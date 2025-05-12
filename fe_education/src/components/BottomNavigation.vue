<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white">
    <RingBottomNavigation
      class=""
      style="padding-bottom: 6px"
      :options="options"
      v-model="selected"
      border-color="#0f5c56"
      title-color="#0f5c56"
      badge-color="#0f5c56"
      icon-color="#0f5c56"
      @click="handleNavigation"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selected = ref(1);

const options = [
  {
    id: 1,
    icon: "fas fa-store",
    title: "Trang chủ",
    path: { name: "home" },
  },
  {
    id: 4,
    icon: "fas fa-user-circle",
    title: "Cá nhân",
    path: { name: "profile" },
  },
];

const handleNavigation = (option) => {
  if (option.path) {
    router.push(option.path);
  }
};
</script>

<style scoped>
/* Add any custom styles here */
:deep(.rg-btn-container-foreground) {
  background-color: white;
}
</style>
