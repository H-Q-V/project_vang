<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Kết quả bài làm của bạn
        </h2>

        <div v-if="submissionData" class="space-y-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-3xl font-bold text-blue-600">
              {{ submissionData.score }}/10
            </p>
            <p class="text-gray-600">Điểm số</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-xl font-semibold text-green-600">
                {{ submissionData.correctAnswers }}/{{
                  submissionData.totalQuestions
                }}
              </p>
              <p class="text-gray-600">Số câu đúng</p>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-xl font-semibold text-purple-600">
                {{ formattedTime }}
              </p>
              <p class="text-gray-600">Thời gian làm bài</p>
            </div>
          </div>

          <!-- Hiển thị thời gian nộp bài -->
          <div class="mt-4 text-sm text-gray-500">
            Thời gian nộp: {{ formatSubmitTime }}
          </div>
        </div>

        <div v-else class="text-gray-600">Đang tải kết quả...</div>

        <button
          @click="goToHome"
          class="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const submissionData = ref(null);

// Format thời gian làm bài
const formattedTime = computed(() => {
  if (!submissionData.value?.submittedAt) return "0 phút";
  const submissionTime = new Date(submissionData.value.submittedAt);
  const startTime = new Date(submissionTime);
  startTime.setMinutes(startTime.getMinutes() - 90);

  const diffInMinutes = Math.round((submissionTime - startTime) / (1000 * 60));
  return `${diffInMinutes} phút`;
});

// Format thời gian nộp bài
const formatSubmitTime = computed(() => {
  if (!submissionData.value?.submittedAt) return "";
  const date = new Date(submissionData.value.submittedAt);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

onMounted(async () => {
  try {
    // Lấy dữ liệu từ localStorage
    const savedData = localStorage.getItem("submissionResult");
    if (savedData) {
      submissionData.value = JSON.parse(savedData);
      // Xóa dữ liệu sau khi đã lấy
      localStorage.removeItem("submissionResult");
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
});

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
