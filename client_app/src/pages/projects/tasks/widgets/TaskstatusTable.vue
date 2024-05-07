<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="noticeList"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(number)="{ rowData }">
        {{ rowData.number }}
      </template>
      <template #cell(worker)="{ rowData }">
        {{ rowData.worker }}
      </template>
      <template #cell(type)="{ rowData }">
        {{ rowData.type }}
      </template>
      <template #cell(sourceLanguage)="{ rowData }">
        {{ rowData.sourceLanguage }}
      </template>
      <template #cell(targetLanguage)="{ rowData }">
        {{ rowData.targetLanguage }}
      </template>
      <template #cell(status)="{ rowData }">
        {{ rowData.status }}
      </template>
      <template #cell(progress)="{ rowData }">
        {{ rowData.progress }}
      </template>
      <template #cell(price)="{ rowData }">
        {{ rowData.price }}
      </template>
      <template #cell(startDate)="{ rowData }">
        {{ rowData.startDate }}
      </template>
      <template #cell(endDate)="{ rowData }">
        {{ rowData.endDate }}
      </template>
    </VaDataTable>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { defineVaDataTableColumns } from "vuestic-ui";
import { Project } from "../../types";
import { Pagination, Sorting } from "../../../../data/pages/tasks";
import { useVModel } from "@vueuse/core";

const columns = defineVaDataTableColumns([
  { label: "번호", key: "number", sortable: true },
  { label: "작업자", key: "worker", sortable: true },
  { label: "유형", key: "type", sortable: true },
  { label: "원본 언어", key: "sourceLanguage", sortable: true },
  { label: "목표 언어", key: "targetLanguage", sortable: true },
  { label: "상태", key: "status", sortable: true },
  { label: "진행상황", key: "progress", sortable: true },
  { label: "단가", key: "price", sortable: true },
  { label: "시작일", key: "startDate", sortable: true },
  { label: "종료일", key: "endDate", sortable: true },
]);

const props = defineProps({
  noticeList: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: Object as PropType<Sorting["sortBy"]>,
    required: true,
  },
  sortingOrder: {
    type: Object as PropType<Sorting["sortingOrder"]>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "edit", project: Project): void;
  (event: "delete", project: Project): void;
}>();

const sortByVModel = useVModel(props, "sortBy", emit);
const sortingOrderVModel = useVModel(props, "sortingOrder", emit);

const totalPages = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.perPage)
);
</script>

<style lang="scss" scoped>
/* Your CSS styles here */
</style>
