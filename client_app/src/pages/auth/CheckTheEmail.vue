<template>
  <div>
    <h1 class="font-semibold text-4xl mb-4">이메일 확인하기</h1>
    <p class="text-base mb-4 leading-5">
      비밀번호 재설정 이메일이 당신의 이메일로 전송되었습니다. 받은 메일함을
      확인해보시고, 필요한 경우 스팸 폴더도 확인해보세요. 도움이 필요하시면,
      <span class="va-link">지원팀에 문의하세요</span>.
    </p>

    <div class="flex justify-center mt-4">
      <VaButton :to="{ name: 'login' }" class="w-full"
        >로그인 화면으로 돌아가기</VaButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>
