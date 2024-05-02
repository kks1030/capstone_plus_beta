<script setup lang="ts">
import VaTimelineItem from "../../../../components/va-timeline-item.vue";
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">회사 연혁</h1>
    </VaCardTitle>
    <VaCardContent>
      <table class="mt-4">
        <tbody>
          <VaTimelineItem date="2023년 3월"> 회사 창업 </VaTimelineItem>
          <VaTimelineItem date="2023년 6월">
            첫 대형 프로젝트 계약 성공적으로 체결
          </VaTimelineItem>
          <VaTimelineItem date="2023년 9월">
            번역 서비스 제공 시작
          </VaTimelineItem>
          <VaTimelineItem date="2023년 12월">
            첫 해외 프로젝트를 런칭
          </VaTimelineItem>
          <VaTimelineItem date="2024년 2월">
            회사 매출 창립 이래 최고치 기록
          </VaTimelineItem>
          <VaTimelineItem date="2024년 5월">
            새로운 사업부문 추가하여 서비스 범위 확장
          </VaTimelineItem>
        </tbody>
      </table>
    </VaCardContent>
  </VaCard>
</template>
