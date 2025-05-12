<template>
  <ChatHeader></ChatHeader>
  <div class="mb-[64px] mt-[120px]">
    <router-view></router-view>
  </div>
  <BottomNavigation></BottomNavigation>
</template>

<script setup>
import BottomNavigation from "@/components/BottomNavigation.vue";
import ChatHeader from "../components/ChatHeader.vue";
</script>

<style scoped></style>
