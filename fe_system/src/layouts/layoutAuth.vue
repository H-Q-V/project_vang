<template>
  <div class="min-h-screen flex justify-between items-center">
    <div
      class="flex flex-col gap-6 items-center justify-center w-full max-w-2xl px-6"
    >
      <h3 class="font-semibold text-3xl text-gray-800 text-center">
        Hệ thống tạo đề thi nhanh
      </h3>
      <div class="">
        <RouterView></RouterView>
      </div>
    </div>
    <div
      class="hidden lg:flex max-w-[60%] overflow-hidden"
      style="
        background: rgb(255, 255, 255);
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(17, 150, 200, 1) 50%,
          rgba(255, 255, 255, 1) 100%
        );
      "
    >
      <img
        class="h-screen w-auto object-cover"
        src="../../public/image/bannerLoginjpg.jpg"
        alt="Banner"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
