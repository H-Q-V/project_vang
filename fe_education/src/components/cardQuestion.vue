<template>
  <div
    v-if="question"
    class="question-item w-full bg-white rounded-lg shadow-md p-6 mb-4"
  >
    <div class="flex items-start gap-4">
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <div class="w-full">
            <div class="font-bold text-xl mb-2">Câu {{ index }}:</div>
            <div class="mb-4">{{ question.text }}</div>
            <div class="space-y-2">
              <div
                v-for="(option, idx) in question.options"
                :key="idx"
                class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                :class="{ 'bg-gray-100': selectedAnswer === option }"
                @click="selectOption(option)"
              >
                <RadioButton
                  :name="`question_${index}`"
                  :value="option"
                  v-model="selectedAnswer"
                  @change="handleAnswerChange"
                />
                <label class="cursor-pointer flex-1">
                  {{ indexToLetter(idx) }}. {{ option }}
                </label>
              </div>
            </div>
          </div>

          <div v-if="question.image" class="w-[70px] ml-4 flex-shrink-0">
            <img
              :src="question.image"
              alt="Question Image"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import RadioButton from "primevue/radiobutton";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  selectedAnswer: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["answer-changed"]);
const selectedAnswer = ref(props.selectedAnswer);

watch(
  () => props.selectedAnswer,
  (newValue) => {
    selectedAnswer.value = newValue;
  }
);

const indexToLetter = (index) => {
  return String.fromCharCode(65 + index);
};

const handleAnswerChange = () => {
  emit("answer-changed", props.index, selectedAnswer.value);
};

const selectOption = (option) => {
  selectedAnswer.value = option;
  handleAnswerChange();
};

onMounted(() => {
  if (props.selectedAnswer) {
    selectedAnswer.value = props.selectedAnswer;
  }
});
</script>

<style scoped>
.question-item {
  position: relative;
  scroll-margin-top: 100px;
}
</style>
