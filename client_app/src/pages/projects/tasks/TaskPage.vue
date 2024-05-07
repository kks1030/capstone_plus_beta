<script setup lang="ts">
import { ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useTasks } from "./composables/useTasks";
import TaskTable from "./widgets/TaskstatusTable.vue";
import EditTaskForm from "./widgets/TaskallocationForm.vue";
import { Task } from "../types";
import { VaDateInput, useModal, useToast } from "vuestic-ui";

const {
  tasks,
  update,
  add,
  isLoading,
  remove,
  pagination,
  sorting,
  searchKeyword,
} = useTasks();

const taskToEdit = ref<Task | null>(null);
const doShowTaskFormModal = ref(false);

const editTask = (task: Task) => {
  taskToEdit.value = task;
  doShowTaskFormModal.value = true;
};

const createNewTask = () => {
  taskToEdit.value = null;
  doShowTaskFormModal.value = true;
};

const { init: notify } = useToast();

const onTaskSaved = async (task: Task) => {
  doShowTaskFormModal.value = false;
  if ("id" in task) {
    await update(task as Task);
    notify({
      message: "작업이 수정되었습니다.",
      color: "success",
    });
  } else {
    await add(task as Task);
    notify({
      message: "작업이 할당되었습니다.",
      color: "success",
    });
  }
};

const { confirm } = useModal();

const onTaskDeleted = async (task: Task) => {
  const response = await confirm({
    title: "작업 제거",
    message: `작업을 (${task}) 제거하려는 것이 맞습니까??`,
    okText: "Delete",
    size: "small",
    maxWidth: "380px",
  });

  if (!response) {
    return;
  }

  await remove(task);
  notify({
    message: "작업이 삭제되었습니다.",
    color: "success",
  });
};

const editFormRef = ref();

const beforeTaskFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: "380px",
      message: "아직 저장되지 않았습니다. 그래도 창을 끄시겠습니까?",
      size: "small",
    });
    if (agreed) {
      hide();
    }
  } else {
    hide();
  }
};
</script>

<style lang="scss" scoped>
/* Your CSS styles here */
</style>

<template>
  <div>
    <h1 class="page-title">작업리스트</h1>

    <VaCard>
      <VaCardContent>
        <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
          <div class="flex flex-col md:flex-row gap-2 justify-start">
            <VaInput
              v-model="searchKeyword"
              placeholder="검색어를 입력해주세요."
            />
          </div>
          <VaButton icon="add" @click="createNewTask">작업 할당</VaButton>
        </div>

        <TaskTable
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          v-model:pagination="pagination"
          :Tasks="tasks"
          :loading="isLoading"
          @edit="editTask"
          @delete="onTaskDeleted"
        />
      </VaCardContent>

      <VaModal
        v-slot="{ cancel, ok }"
        v-model="doShowTaskFormModal"
        size="small"
        mobile-fullscreen
        close-button
        stateful
        hide-default-actions
        :before-cancel="beforeTaskFormModalClose"
      >
        <h1 v-if="TaskToEdit === null" class="va-h5 mb-4">공지사항 추가</h1>
        <h1 v-else class="va-h5 mb-4">공지사항 수정</h1>
        <EditTaskForm
          ref="editFormRef"
          :Task="TaskToEdit"
          :save-button-label="TaskToEdit === null ? '추가' : '저장'"
          @close="cancel"
          @save="
            (Task) => {
              onTaskSaved(Task);
              ok();
            }
          "
        />
      </VaModal>
    </VaCard>
  </div>
</template>
