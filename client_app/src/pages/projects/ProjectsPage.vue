<script setup lang="ts">
import { ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useProjects } from "./composables/useProjects";
import ProjectTable from "./widgets/ProjectsTable.vue";
import EditProjectForm from "./widgets/EditProjectForm.vue";
import { Project } from "./types";
import { VaDateInput, useModal, useToast } from "vuestic-ui";

const {
  projects,
  update,
  add,
  isLoading,
  remove,
  pagination,
  sorting,
  searchQuery,
  startDate,
  endDate,
} = useProjects();

const projectToEdit = ref<Project | null>(null);
const doShowProjectFormModal = ref(false);

const editProject = (project: Project) => {
  projectToEdit.value = project;
  doShowProjectFormModal.value = true;
};

const createNewProject = () => {
  projectToEdit.value = null;
  doShowProjectFormModal.value = true;
};

const { init: notify } = useToast();

const onProjectSaved = async (project: Project) => {
  doShowProjectFormModal.value = false;
  if ("id" in project) {
    await update(project as Project);
    notify({
      message: "Project updated",
      color: "success",
    });
  } else {
    await add(project as Project);
    notify({
      message: "Project created",
      color: "success",
    });
  }
};

const { confirm } = useModal();

const onProjectDeleted = async (project: Project) => {
  const response = await confirm({
    title: "프로젝트 제거",
    message: `프로젝트를 (${project.project_name}) 제거하려는 것이 맞습니까??`,
    okText: "Delete",
    size: "small",
    maxWidth: "380px",
  });

  if (!response) {
    return;
  }

  await remove(project);
  notify({
    message: "Project deleted",
    color: "success",
  });
};

const editFormRef = ref();

const beforeEditFormModalClose = async (hide: () => unknown) => {
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

watch(
  [startDate, endDate],
  () => {
    if (startDate.value && endDate.value && startDate.value > endDate.value) {
      const temp = startDate.value;
      startDate.value = endDate.value;
      endDate.value = temp;
    }
  },
  { deep: true }
);
</script>

<template>
  <h1 class="page-title">Projects</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <!-- Add search input and date pickers -->
          <VaInput
            v-model="searchQuery"
            placeholder="프로젝트명을 입력해 주세요"
          />
          <VaDateInput v-model="startDate" placeholder="시작일" clearable />
          <VaDateInput v-model="endDate" placeholder="종료일" clearable />
        </div>
        <!--VaButton @click="searchProjects" size="small"> <VaIcon name="manage_search" size="medium" /> </VaButton-->
        <VaButton icon="add" @click="createNewProject">Project</VaButton>
      </div>

      <ProjectTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :projects="projects"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowProjectFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Add project</h1>
      <h1 v-else class="va-h5 mb-4">Edit project</h1>
      <EditProjectForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (project) => {
            onProjectSaved(project);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
