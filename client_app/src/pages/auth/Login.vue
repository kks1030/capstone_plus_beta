<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">로그인</h1>
    <p class="text-base mb-4 leading-5">
      글나무 저작도구가 처음이신가요?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary"
        >회원가입</RouterLink
      >
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="이메일"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="비밀번호"
        @clickAppendInner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="
              isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'
            "
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <VaCheckbox
        v-model="formData.keepLoggedIn"
        class="mb-2 sm:mb-0"
        label="이 장치에서 로그인 상태 유지"
      />
      <RouterLink
        :to="{ name: 'recover-password' }"
        class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary"
      >
        비밀번호를 잊으셨나요?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">로그인</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm, useToast } from "vuestic-ui";
import { validators } from "../../services/utils";

const { validate } = useForm("form");
const { push } = useRouter();
const { init } = useToast();

const formData = reactive({
  email: "",
  password: "",
  keepLoggedIn: false,
});

const submit = () => {
  if (validate()) {
    init({ message: "로그인에 성공했습니다", color: "success" });
    push({ name: "dashboard" });
  }
};
</script>
