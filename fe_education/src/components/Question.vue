<template>
  <div class="w-full px-10 flex flex-col justify-center items-start gap-5">
    <cardQuestion
      v-for="(u, i) of currentPageQuestions"
      :key="i"
      :question="u"
      :index="(currentPage - 1) * questionsPerPage + i + 1"
      :selected-answer="
        allAnswers[(currentPage - 1) * questionsPerPage + i + 1]
      "
      @answer-changed="handleAnswerChange"
    ></cardQuestion>
  </div>

  <div class="w-full px-10 pt-4 mt-8">
    <h3 class="text-lg font-semibold text-blue-600 mb-4">ĐIỀU HƯỚNG BÀI TẬP</h3>
    <div class="grid grid-cols-5 gap-2">
      <button
        v-for="n in totalQuestions"
        :key="n"
        class="h-10 rounded flex items-center justify-center cursor-pointer transition-colors"
        :class="{
          'border-2 border-red-500': !answers[n],
          'border border-gray-300': answers[n],
          'bg-white hover:bg-gray-100': true,
          'border-blue-500 border-2': isCurrentQuestion(n),
        }"
        @click="goToQuestion(n)"
      >
        {{ n }}
      </button>
    </div>
    <div class="mt-4 flex justify-center items-center text-gray-600">
      <div>Thời gian còn lại {{ formattedTime }}</div>
    </div>
  </div>

  <div class="flex justify-around mt-4">
    <Button
      label="Trở về"
      variant="text"
      raised
      :disabled="currentPage === 1"
      @click="prevPage"
    />
    <Button
      v-if="currentPage === totalPages"
      label="Nộp bài"
      severity="success"
      raised
      @click="submitTest"
    />
    <Button
      v-else
      label="Tiếp tục"
      severity="secondary"
      variant="text"
      raised
      @click="nextPage"
    />
  </div>
  <div class="text-center mt-4">Trang {{ currentPage }}/{{ totalPages }}</div>

  <Dialog v-model:visible="showSubmitDialog" modal header="Xác nhận nộp bài">
    <p>Bạn có chắc chắn muốn nộp bài?</p>
    <template #footer>
      <Button label="Không" @click="showSubmitDialog = false" />
      <Button label="Nộp bài" severity="success" @click="confirmSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from "vue";
import cardQuestion from "@/components/cardQuestion.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import axios from "axios";

const dataQuestion = ref(null);
const currentPage = ref(1);
const questionsPerPage = 10;
const answers = ref({});
const allAnswers = ref({});
const showSubmitDialog = ref(false);
const initialExamDuration = ref(null);
const router = useRouter();

// Thêm các biến cho đồng hồ đếm ngược
const minutes = ref(90);
const seconds = ref(0);
const timer = ref(null);

// Format thời gian
const formattedTime = computed(() => {
  const formattedMinutes = minutes.value.toString().padStart(2, "0");
  const formattedSeconds = seconds.value.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
});

const startTimer = () => {
  timer.value = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else if (minutes.value > 0) {
      minutes.value--;
      seconds.value = 59;
    } else {
      clearInterval(timer.value);
      confirmSubmit();
    }
    saveRemainingTime(); // Thêm dòng này để đảm bảo lưu thời gian mỗi giây
  }, 1000);
};

// Hàm dừng đồng hồ
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
};

const fetchQuestions = async () => {
  try {
    const examId = localStorage.getItem("currentExamId");
    if (!examId) {
      console.error("ExamId not found");
      router.push("/");
      return;
    }
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/questions/getQuestion/${examId}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    if (!response.data) {
      throw new Error("No data received");
    }
    dataQuestion.value = response.data.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
  }
};

const saveRemainingTime = () => {
  const timeLeft = {
    minutes: minutes.value,
    seconds: seconds.value,
    examId: localStorage.getItem("currentExamId"),
  };
  localStorage.setItem("examTimeLeft", JSON.stringify(timeLeft));
};

watch([minutes, seconds], () => {
  saveRemainingTime();
});

onMounted(async () => {
  await fetchQuestions();

  // Khôi phục thời gian từ localStorage nếu có
  const savedTime = localStorage.getItem("examTimeLeft");
  if (savedTime) {
    const { minutes: savedMinutes, seconds: savedSeconds } =
      JSON.parse(savedTime);
    minutes.value = savedMinutes;
    seconds.value = savedSeconds;
  }

  // Lấy thời gian từ backend
  try {
    const examId = localStorage.getItem("currentExamId");
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/exam/duration/${examId}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );

    if (response.data.data && !savedTime) {
      minutes.value = response.data.data.minutes;
      seconds.value = response.data.data.seconds;
    }

    startTimer();
  } catch (error) {
    console.error("Error fetching duration:", error);
    startTimer(); // Vẫn start timer với thời gian mặc định nếu API lỗi
  }
});

onUnmounted(() => {
  stopTimer();
});

const totalQuestions = computed(() => {
  return dataQuestion.value ? dataQuestion.value.length : 0;
});

const totalPages = computed(() => {
  if (!dataQuestion.value) return 1;
  return Math.ceil(dataQuestion.value.length / questionsPerPage);
});

const currentPageQuestions = computed(() => {
  if (!dataQuestion.value) return [];
  const start = (currentPage.value - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  return dataQuestion.value.slice(start, end);
});

const isCurrentQuestion = (n) => {
  return (
    (currentPage.value - 1) * questionsPerPage < n &&
    n <= currentPage.value * questionsPerPage
  );
};

const goToQuestion = (questionNumber) => {
  const targetPage = Math.ceil(questionNumber / questionsPerPage);
  currentPage.value = targetPage;

  nextTick(() => {
    const questionIndexInPage = (questionNumber - 1) % questionsPerPage;
    const questionElements = document.querySelectorAll(".question-item");
    if (questionElements[questionIndexInPage]) {
      const yOffset = -100;
      const element = questionElements[questionIndexInPage];
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleAnswerChange = (questionIndex, answer) => {
  allAnswers.value[questionIndex] = answer;
  answers.value[questionIndex] = !!answer;
};

const submitTest = () => {
  showSubmitDialog.value = true;
};

const confirmSubmit = async () => {
  try {
    stopTimer();
    const examId = localStorage.getItem("currentExamId");
    const danhSachCauTraLoi = Object.entries(allAnswers.value).map(
      ([index, answer]) => ({
        question: dataQuestion.value[parseInt(index) - 1]._id,
        answer: answer || "",
      })
    );

    const response = await axios.post(
      `${import.meta.env.VITE_HOST_URL}/submission/create`,
      {
        exam: examId,
        answers: danhSachCauTraLoi,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );

    showSubmitDialog.value = false;

    localStorage.setItem(
      "submissionResult",
      JSON.stringify(response.data.data)
    );

    router.push("/notification");
  } catch (error) {
    console.error("Lỗi khi nộp bài:", error);
  }
};
</script>

<style scoped>
.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.transition-colors {
  transition: all 0.3s ease;
}
</style>
