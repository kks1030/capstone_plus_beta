<script setup lang="ts">
import { PropType } from 'vue'
import { Project } from '../types'

defineProps({
  status: {
    type: String as PropType<Project['status']>,
    required: true,
  },
})

const badgeColorMap: Record<Project['status'], string> = {
  '진행중': 'primary',
  '완료': 'success',
  '중단': 'secondary',
  '취소': 'warning',
}
</script>

<template>
  <VaBadge square :color="badgeColorMap[$props.status]" :text="$props.status.toUpperCase()" />
</template>
