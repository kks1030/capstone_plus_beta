<template>
  <div class="app-navbar-actions">
    <VaButton
      v-if="!isMobile"
      preset="secondary"
      href="https://www.voctree.co.kr/"
      target="_blank"
      color="textPrimary"
      class="app-navbar-actions__item flex-shrink-0 mx-0"
    >
      {{ t("글나무") }}
    </VaButton>
    <VaButton
      v-if="!isMobile"
      preset="secondary"
      :to="{ name: 'login' }"
      color="textPrimary"
      class="app-navbar-actions__item flex-shrink-0 mx-0"
    >
      {{ t("로그인") }}
    </VaButton>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a
        href="#"
        @click="showModal = true"
        class="text-sm font-semibold leading-6 text-black"
        >로그인 <span aria-hidden="true">&rarr;</span></a
      >
    </div>
    <Teleport to="body">
      <LoginModalVue :show="showModal" @close="showModal = false">
        <template #header>
          <a href="#" class="modal-default-button" @click="showModal = false"
            >X</a
          >
        </template>
      </LoginModalVue>
    </Teleport>

    <ProfileDropdown
      class="app-navbar-actions__item app-navbar-actions__item--profile mr-1"
    />
  </div>
</template>

<script lang="ts" setup>
import ProfileDropdown from "./dropdowns/ProfileDropdown.vue";
const showModal = ref(false);

defineProps({
  isMobile: { type: Boolean, default: false },
});

import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t } = useI18n();
</script>

<style lang="scss">
.app-navbar-actions {
  display: flex;
  align-items: center;

  .va-dropdown__anchor {
    color: var(--va-primary);
    fill: var(--va-primary);
  }

  &__item {
    padding: 0;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    svg {
      height: 20px;
    }

    &--profile {
      display: flex;
      justify-content: center;
    }

    .va-dropdown-content {
      background-color: var(--va-white);
    }

    @media screen and (max-width: 640px) {
      margin-left: 0;
      margin-right: 0;

      &:first-of-type {
        margin-left: 0;
      }
    }
  }
}
</style>
