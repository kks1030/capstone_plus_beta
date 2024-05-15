<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { EmptyProject, Project } from "../types";
import { SelectOption } from "vuestic-ui";
import { useUsers } from "../../users/composables/useUsers";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";

const props = defineProps<{
  project: Project | null;
  saveButtonLabel: string;
}>();

defineEmits<{
  (event: "save", project: Project): void;
  (event: "close"): void;
}>();

const defaultNewProject: EmptyProject = {
  project_name: "",
  project_owner: undefined,
  team: [],
  status: undefined,
  taskType: "MT", // 작업 유형
  estimate: 0, // 견적
  originalLanguage: "",
  targetLanguage: "",
  targetWorkload: 0,
};

const newProject = ref({ ...defaultNewProject });

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newProject.value).some((key) => {
    if (key === "team") {
      return false;
    }

    return (
      newProject.value[key as keyof EmptyProject] !==
      (props.project ?? defaultNewProject)?.[key as keyof EmptyProject]
    );
  });
});

defineExpose({
  isFormHasUnsavedChanges,
});

watch(
  () => props.project,
  () => {
    if (!props.project) {
      return;
    }

    newProject.value = {
      ...props.project,
      project_owner: props.project.project_owner,
    };
  },
  { immediate: true }
);

const required = (v: string | SelectOption) => !!v || "This field is required";

const { users: teamUsers, filters: teamFilters } = useUsers({
  pagination: ref({ page: 1, perPage: 100, total: 10 }),
});
const { users: ownerUsers, filters: ownerFilters } = useUsers({
  pagination: ref({ page: 1, perPage: 100, total: 10 }),
});
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <!-- 프로젝트 이름 입력 칸 -->
    <VaInput
      v-model="newProject.project_name"
      label="프로젝트명"
      :rules="[required]"
    />

    <!-- 작업 유형 선택 칸 -->
    <VaSelect
      v-model="newProject.taskType"
      label="작업유형"
      :options="['MT', 'PE']"
    />

    <!-- 견적가 입력 칸 -->
    <VaInput
      v-model.number="newProject.estimate"
      label="견적가"
      type="number"
    />

    <div class="input-row">
      <!-- 원본 언어 입력 칸 -->
      <VaInput v-model="newProject.originalLanguage" label="원본언어" />

      <!-- 목표 언어 입력 칸 -->
      <VaInput v-model="newProject.targetLanguage" label="목표언어" />

      <!-- 목표 작업량 입력 칸 -->
      <VaInput
        v-model.number="newProject.targetWorkload"
        label="목표 작업량"
        type="number"
      />

      <!-- 삭제 버튼 -->
      <VaButton @click="deleteField(index)" style="width: 300px">삭제</VaButton>
    </div>

    <VaSelect
      v-model="newProject.status"
      label="상태"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: '진행중', value: '진행중' },
        { text: '완료', value: '완료' },
        { text: '중단', value: '중단' },
        { text: '취소', value: '취소' },
      ]"
    >
      <template #content="{ value }">
        <ProjectStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancel</VaButton
      >
      <VaButton @click="validate() && $emit('save', newProject as Project)">{{
        saveButtonLabel
      }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
.input-row {
  display: flex;
  width: 100px;
}

.input-row > * {
  flex-grow: 1;
  margin-right: 10px;
}

.input-row > :last-child {
  margin-right: 0;
}
</style>
