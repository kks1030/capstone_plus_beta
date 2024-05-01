<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">회원가입</h1>
    <p class="text-base mb-4 leading-5">
      이미 계정이 있으신가요?
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary"
        >로그인</RouterLink
      >
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[
        (v) => !!v || '이메일 작성은 필수입니다',
        (v) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력해 주세요',
      ]"
      class="mb-4"
      label="이메일"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="비밀번호"
        messages="비밀번호는 8자 이상: 문자, 숫자, 특수문자를 포함해야 합니다."
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
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || '비밀번호 재입력 입력란은 필수적으로 입력해야 합니다',
          (v) => v === formData.password || '비밀번호가 일치하지 않습니다',
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="비밀번호 재입력"
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

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">계정 생성</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm, useToast } from "vuestic-ui";

const { validate } = useForm("form");
const { push } = useRouter();
const { init } = useToast();

const formData = reactive({
  email: "",
  password: "",
  repeatPassword: "",
});

const submit = () => {
  if (validate()) {
    init({
      message: "성공적으로 가입되었습니다",
      color: "success",
    });
    push({ name: "dashboard" });
  }
};

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || "비밀번호 입력은 필수입니다",
  (v) => (v && v.length >= 8) || "비밀번호는 최소 8자 이상이어야 합니다",
  (v) =>
    (v && /[A-Za-z]/.test(v)) ||
    "비밀번호에는 최소 한 글자의 문자가 포함되어야 합니다",
  (v) =>
    (v && /\d/.test(v)) || "비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다",
  (v) =>
    (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) ||
    "비밀번호에는 최소 한 개의 특수 문자가 포함되어야 합니다",
];
</script>
