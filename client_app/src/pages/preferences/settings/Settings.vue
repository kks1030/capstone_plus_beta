<template>
  <div
    class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">이름</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.userName }}
      </div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      @click="emits('openNameModal')"
    >
      수정
    </VaButton>
  </div>
  <VaDivider />
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">이메일</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ store.email }}
      </div>
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">비밀번호</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      @click="emits('openResetPasswordModal')"
    >
      비밀번호 재설정
    </VaButton>
  </div>
  <VaDivider />
  <!--div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">이중 인증</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ twoFA.content }}
      </div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      :color="twoFA.color"
      @click="toggle2FA"
    >
      {{ twoFA.button }}
    </VaButton>
  </div-->
  <VaDivider />
</template>
<script lang="ts" setup>
import { computed } from "vue";

import { useToast } from "vuestic-ui/web-components";

import { useUserStore } from "../../../stores/user-store";

import { buttonStyles } from "../styles";

const store = useUserStore();

const { init } = useToast();

const toastMessage = computed(() =>
  store.is2FAEnabled
    ? "이중인증이 성공적으로 활성화되었습니다"
    : "이중인중이 성공적으로 비활성화되었습니다"
);

const twoFA = computed(() => {
  if (store.is2FAEnabled) {
    return {
      color: "danger",
      button: "이중 인증 비활성화",
      content:
        "계정의 이중 인증(2FA)이(가) 활성화되어 로그인 시 추가 보안 계층이 적용됩니다.",
    };
  } else {
    return {
      color: "primary",
      button: "이중 인증 설정",
      content:
        "계정에 추가 보안 계층을 추가합니다. 로그인할 때 사용자 이름과 비밀번호 외에 코드를 제공해야 합니다.",
    };
  }
});

const toggle2FA = () => {
  store.toggle2FA();
  init({ message: toastMessage.value, color: "success" });
};

const emits = defineEmits(["openNameModal", "openResetPasswordModal"]);
</script>
