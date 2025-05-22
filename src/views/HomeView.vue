<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { guessLanguage, Language } from '@/utils/guess-lang'

const data = ref<string>('')

async function loadData(language: Language): Promise<string> {
  const dataFile = await fetch(`${import.meta.env.BASE_URL}content/home/${language}.html`)
  return await dataFile.text()
}

onMounted(async () => {
  data.value = await loadData(guessLanguage())

  addEventListener('languagechange', async (event: Event) => {
    const newLanguage = (event as CustomEvent).detail.language
    data.value = await loadData(newLanguage)
  })
})
</script>
<template>
  <div id="home-header">
    <p class="description" v-html="data"></p>
  </div>
</template>

<style scoped>
#home-header {
  width: 100%;
  margin-top: 1rem;
  padding: 0 1rem;
}

.description {
  color: var(--text-secondary);
}

:deep(.description a) {
  color: var(--text-secondary);
  transition: color 0.15s;
}
:deep(.description a:hover) {
  color: var(--text-primary);
}
:deep(.description strong) {
  color: var(--text-primary);
}
</style>
