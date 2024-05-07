<script setup lang="ts">
import { PropType, computed } from "vue";
import { defineVaDataTableColumns } from "vuestic-ui";
import { Task } from "../../types";
import { Pagination, Sorting } from "../../../../data/pages/tasks";
import { useVModel } from "@vueuse/core";

const columns = defineVaDataTableColumns([
  { label: "번호", key: "index", sortable: false },
  { label: "작업자", key: "worker", sortable: true },
  { label: "유형", key: "type", sortable: true },
  { label: "상태", key: "status", sortable: true },
  { label: "시작일", key: "startDate", sortable: true },
  { label: "종료일", key: "endDate", sortable: true },
  { label: " ", key: "actions" },
]);

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
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
  (event: "edit", task: Task): void;
  (event: "delete", task: Task): void;
}>();

const avatarColor = (userName: string) => {
  const colors = ["primary", "#FFD43A", "#ADFF00", "#262824", "danger"];
  const index = userName.charCodeAt(0) % colors.length;
  return colors[index];
};

const sortByVModel = useVModel(props, "sortBy", emit);
const sortingOrderVModel = useVModel(props, "sortingOrder", emit);

const totalPages = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.perPage)
);
</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="tasks"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(index)="{ rowIndex }">
        {{
          $props.pagination.perPage * ($props.pagination.page - 1) +
          rowIndex +
          1
        }}
      </template>
      <template #cell(worker)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.worker.fullname }}
        </div>
      </template>
      <template #cell(type)="{ rowData }">
        {{ rowData.type }}
      </template>
      <template #cell(status)="{ rowData: task }">
        <TaskStatusBadge :status="task.status" />
      </template>
      <template #cell(startDate)="{ rowData }">
        {{ rowData.startDate }}
      </template>
      <template #cell(endDate)="{ rowData }">
        {{ rowData.endDate }}
      </template>
      <template #cell(actions)="{ rowData: task }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit task"
            @click="$emit('edit', task as Task)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete task"
            @click="$emit('delete', task as Task)"
          />
        </div>
      </template>
    </VaDataTable>
    <div
      class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
    >
      <div>
        <b>{{ $props.pagination.total }} results.</b>
        Results per page
        <VaSelect
          v-model="$props.pagination.perPage"
          class="!w-20"
          :options="[10, 50, 100]"
        />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
