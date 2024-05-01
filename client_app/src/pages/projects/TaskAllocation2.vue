<template>
  <div class="p-4 bg-backgroundSecondary">
    <VaCard class="mb-6">
      <VaCardContent class="flex flex-col items-baseline">
        <div v-for="(value, key) in form" :key="key" class="flex items-center">
          <div class="flex items-center w-48">{{ getTitle(key) }}</div>
          <div class="w-100">{{ getFormattedValue(key, value) }}</div>
        </div>
      </VaCardContent>
      <VaCardActions class="flex flex-wrap content-center mt-4">
        <VaButton>작업 시작</VaButton>
        <VaButton>번역 제출</VaButton>
        <VaButton>납품 준비</VaButton>
        <VaButton>납품 완료</VaButton>
      </VaCardActions>
    </VaCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  workType: "번역",
  originalLanguage: "한국어",
  targetLanguage: "영어",
  worker: "김철수",
  email: "kim@email.com",
  unitPrice: "1,000",
  startDate: "2024-01-06",
  endDate: "2024-01-06",
  status: "번역요청",
  progress: 10000,
  total: 25000,
});

const getTitle = (key: string) => {
  const titles: { [key: string]: string } = {
    workType: "유형",
    originalLanguage: "원본언어",
    targetLanguage: "목표언어",
    worker: "작업자",
    unitPrice: "단가",
    startDate: "시작일/종료일",
    status: "상태",
    progress: "진행현황",
  };
  return titles[key] || "";
};

const getFormattedValue = (key: string, value: any) => {
  if (key === "worker") {
    return `${form.value.worker}(${form.value.email})`;
  } else if (key === "progress") {
    return `${value.toLocaleString()} / ${form.value.total.toLocaleString()}`;
  } else if (key === "startDate") {
    return `${value} ~ ${form.value.endDate}`;
  } else if (key === "total" || key === "endDate" || key === "email") {
    return;
  }
  return value;
};
</script>
