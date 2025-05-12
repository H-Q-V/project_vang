<template>
  <div
    v-if="exams"
    class="flex mx-5 justify-around py-2 mb-2"
    style="border-bottom: 1px solid #ccc"
  >
    <div class="flex flex-col justify-center items-start">
      <div class="flex justify-center items-center gap-2">
        <p>Môn thi:</p>
        <p>{{ exams.subject }}</p>
      </div>
      <div class="flex justify-center items-center gap-2">
        <p>Thời gian:</p>
        <p>{{ exams.duration }} phút</p>
      </div>
    </div>
    <div>
      <div class="flex justify-center items-center gap-2">
        <p>Kì thi:</p>
        <p>{{ exams.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const exams = ref(null);
const checked = ref(false);

const fetchExam = async () => {
  try {
    const examId = localStorage.getItem("currentExamId");
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/exam/getOne/${examId}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    exams.value = response.data.data;
    if (exams.value?.duration) {
      localStorage.setItem("examDuration", exams.value.duration);
    }
  } catch (error) {
    console.error("Error fetching exams:", error);
  }
};

onMounted(() => {
  fetchExam();
});
</script>
