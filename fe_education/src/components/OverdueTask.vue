<template>
  <Toast />
  <div
    v-for="exam in exams.data"
    :key="exam.id"
    class="exam-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div class="flex items-start gap-3">
      <div class="icon-wrapper mt-1">
        <i class="pi pi-calendar text-blue-500 text-xl"></i>
      </div>
      <div class="exam-details flex-1">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ exam.title }}
        </h3>
        <div class="time-info flex items-center text-gray-600">
          <i class="pi pi-clock mr-2"></i>
          <span>{{ exam.date }},{{ exam.timeStart }} » {{ exam.timeEnd }}</span>
        </div>
        <div class="mt-3 flex gap-2">
          <Button
            label="Chi tiết"
            icon="pi pi-info-circle"
            severity="info"
            size="small"
            @click="show()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import axios from "axios";
const toast = useToast();
const router = useRouter();
const exams = ref([]);

const show = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Bài kiểm tra đã hết hạn",
    life: 3000,
  });
};

const fetchExams = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/exam/Overdue`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    exams.value = response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
  }
};

onMounted(() => {
  fetchExams();
});
// const handleTest = () => {
//   router.push("/test");
// };
</script>

<style scoped>
.exam-card {
  border: 1px solid #e2e8f0;
}

.exam-card:hover {
  border-color: #cbd5e1;
}

.time-info {
  font-size: 0.95rem;
}
</style>
