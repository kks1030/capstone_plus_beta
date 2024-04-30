<template>
  <div class="flex items-center justify-between">
    <p>Language</p>
    <div class="w-40">
      <VaSelect v-model="model" :options="options" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { useI18n } from 'vue-i18n'

type LanguageMap = Record<string, string>

const { locale } = useI18n()

const languages: LanguageMap = {
  english: '영어',
  spanish: '스페인어',
  brazilian_portuguese: '포르투갈어',
  simplified_chinese: '중국어(간체)',
  persian: '페르시아어',
  korean:'한국어'
}

const languageCodes: LanguageMap = {
  gb: languages.english,
  es: languages.spanish,
  br: languages.brazilian_portuguese,
  cn: languages.simplified_chinese,
  ir: languages.persian,
  kr: languages.korean,
}

const languageName: LanguageMap = Object.fromEntries(Object.entries(languageCodes).map(([key, value]) => [value, key]))

const options = Object.values(languageCodes)

const model = computed({
  get() {
    return languageCodes[locale.value]
  },
  set(value) {
    locale.value = languageName[value]
  },
})
</script>
