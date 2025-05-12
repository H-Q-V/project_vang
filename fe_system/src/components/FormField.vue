<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="font-bold">{{ label }}</label>
    <slot></slot>
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: () => `field-${Math.random().toString(36).substr(2, 9)}`,
  },
});
</script>

<style scoped>
.p-error {
  color: #ef4444;
  font-size: 0.875rem;
}
</style>
