<template>
  <div class="min-h-screen bg-gray-69 p-5">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header section -->
      <div class="bg-gradient-to-r bg-[#0f5c56] p-6">
        <h2 class="text-base font-bold text-white">Danh Mục Bài Thi</h2>
        <p class="text-blue-100 text-sm mt-1">Quản lý các bài thi của bạn</p>
      </div>

      <!-- Menu items -->
      <div class="p-4">
        <div class="space-y-4">
          <!-- Upcoming Exams -->
          <div
            class="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            @click="router.push('/Upcoming')"
          >
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-full">
                <i class="pi pi-spinner text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-semibold text-gray-800">
                  Bài Thi Sắp Tới
                </h3>
                <p class="text-gray-600 text-xs">Xem các bài thi sắp diễn ra</p>
              </div>
              <i class="pi pi-chevron-right ml-auto text-gray-400"></i>
            </div>
          </div>

          <!-- Past Exams -->
          <div
            class="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            @click="router.push('/Overdue')"
          >
            <div class="flex items-center">
              <div class="bg-purple-100 p-3 rounded-full">
                <i class="pi pi-refresh text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-semibold text-gray-800">
                  Bài Thi Đã Diễn Ra
                </h3>
                <p class="text-gray-600 text-xs">Xem lịch sử các bài thi</p>
              </div>
              <i class="pi pi-chevron-right ml-auto text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
/* Thêm hiệu ứng hover mượt mà */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
