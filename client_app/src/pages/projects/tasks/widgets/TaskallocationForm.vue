<template>
  <div>
    <!--  <h1 class="page-title">{{ props.title }} 작업 할당</h1>-->
    <h1 class="page-title">작업 할당</h1>
    <div class="flex flex-col p-4 bg-backgroundSecondary">
      <VaCard class="mb-6">
        <VaCardContent>
          <VaDataTable striped :columns="columns" :items="items">
            <template #cell(action)="{ value, rowData, rowIndex }">
              <VaChip
                size="small"
                @click="
                  () => handleRowClick({ rowData: rowData, rowIndex: rowIndex })
                "
              >
                {{ value }}
              </VaChip>
            </template>
          </VaDataTable>
        </VaCardContent>

        <VaCardContent v-if="showForm">
          <VaForm ref="formRef" class="flex flex-col items-baseline gap-2">
            할당할 작업에 대한 정보를 입력해 주세요.
            <VaInput
              v-model="form.additionalCount"
              label="추가할당 건수"
              placeholder="작업건수"
            />
            <VaSelect
              v-model="form.originalLanguage"
              :options="languages"
              label="원본 언어"
              placeholder="원본언어"
            />
            <VaSelect
              v-model="form.targetLanguage"
              :options="languages"
              label="목표 언어"
              placeholder="목표언어"
            />
            <VaInput
              v-model="form.worker"
              label="작업자"
              placeholder="작업자"
            />
            <VaSelect
              v-model="form.workType"
              :options="workTypes"
              label="작업유형"
              placeholder="작업유형"
            />
            <VaInput v-model="form.unitPrice" label="단가" placeholder="단가" />
            <div>
              <VaDateInput
                v-model="form.startDate"
                label="시작일"
                manual-input
                clearable
              />
              ~
              <VaDateInput
                v-model="form.endDate"
                label="종료일"
                manual-input
                clearable
              />
            </div>
          </VaForm>
          <VaCardActions vertical class="flex flex-wrap content-center mt-4">
            <VaButton @click="submit()"> 등록 </VaButton>
          </VaCardActions>
        </VaCardContent>
      </VaCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../../../../router";

const submit = () => {
  router.push({ name: "pricing-plans" });
};

const form = ref({
  additionalCount: "",
  originalLanguage: "",
  targetLanguage: "",
  worker: "",
  workType: "",
  unitPrice: "",
  startDate: null as Date | null,
  endDate: null as Date | null,
});

const columns = ref([
  { key: "originalLanguage", label: "원본언어" },
  { key: "targetLanguage", label: "목표언어" },
  { key: "workItemCount", label: "작업물 등록 건수" },
  { key: "untranslatedCount", label: "번역 미할당 건수" },
  { key: "proofreadingCount", label: "감수 미할당 건수" },
  { key: "finalReviewCount", label: "최종 리뷰 미할당 건수" },
  { key: "action", label: "액션" },
]);

const languages = ref(["영어", "한국어", "일본어"]);

const workTypes = ref(["번역", "감수", "최종번역"]);

const items = ref([
  {
    originalLanguage: "한국어",
    targetLanguage: "영어",
    workItemCount: 10000000,
    untranslatedCount: 9975000,
    proofreadingCount: 9975000,
    finalReviewCount: 10000000,
    action: "선택",
  },
  {
    originalLanguage: "영어",
    targetLanguage: "한국어",
    workItemCount: 10000000,
    untranslatedCount: 9975000,
    proofreadingCount: 9975000,
    finalReviewCount: 10000000,
    action: "선택",
  },
  {
    originalLanguage: "일본어",
    targetLanguage: "한국어",
    workItemCount: 10000000,
    untranslatedCount: 9975000,
    proofreadingCount: 9975000,
    finalReviewCount: 10000000,
    action: "선택",
  },
]);

const showForm = ref(false);
const currentRow = ref();
const handleRowClick = ({
  rowData,
  rowIndex,
}: {
  rowData: any;
  rowIndex: any;
}) => {
  form.value = rowData;
  currentRow.value == rowIndex
    ? (showForm.value = !showForm.value)
    : (showForm.value = true);
  currentRow.value = rowIndex;
};
</script>
