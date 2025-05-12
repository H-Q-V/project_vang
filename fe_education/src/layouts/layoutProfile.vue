<template>
  <Return></Return>
  <div class="mb-[64px] mt-[120px]">
    <router-view></router-view>
  </div>
  <BottomNavigation></BottomNavigation>
</template>

<script setup>
import Return from "@/components/Return.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
</script>

<style scoped></style>
