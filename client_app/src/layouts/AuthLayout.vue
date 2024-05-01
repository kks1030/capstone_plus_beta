<template>
  <VaLayout class="h-screen bg-[var(--va-background-secondary)]">
    <template #content>
      <div class="p-4 h-full flex justify-center items-center">
        <main class="flex flex-col items-center mx-auto max-w-[420px]">
          <RouterLink class="py-4" to="/" aria-label="Visit homepage">
            <img src="/namefavicon.ico" alt="글나무" width="150" height="100" />
          </RouterLink>
          <RouterView />
        </main>
      </div>
    </template>
  </VaLayout>
</template>

<script lang="ts" setup>
import { useBreakpoint } from "vuestic-ui";

const breakpoint = useBreakpoint();
</script>
