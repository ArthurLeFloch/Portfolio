<script setup lang="ts">
import type { Project } from '@/types/project-type'
import StatusComponent from '@/components/StatusComponent.vue'
import TechnologyList from '@/components/TechnologyList.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'

import { guessLanguage, Language } from '@/utils/guess-lang'
import { onMounted, ref } from 'vue'

const data = ref<Project[]>([])

async function loadData(language: Language): Promise<Project[]> {
  const dataFile = await fetch(`${import.meta.env.BASE_URL}content/others/${language}.json`)
  return await dataFile.json()
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
  <div id="section-container">
    <div v-for="(item, index) in data" :key="index" class="section">
      <div class="section-title">
        <h3 class="title">{{ item.title }}</h3>
        <StatusComponent :status="item.status" />
      </div>
      <TechnologyList v-if="item.technologies.length" :technologies="item.technologies" />
      <div class="section-content">
        <p class="description" v-html="item.description"></p>
      </div>
      <div v-if="item.githubUrl">
        <a :href="item.githubUrl" target="_blank" class="github-button">
          <img src="/assets/icons/github.svg" alt="GitHub" />
          <span class="button-text">{{ $t('see_github') }}</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 0 2rem;
  overflow-y: auto;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--secondary-background);

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--secondary-background);
}
.section:first-child {
  margin-top: 2rem;
}
.section:last-child {
  margin-bottom: 2rem;
}
.section-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-wrap: nowrap;
  overflow-x: hidden;

  margin-top: 0;
  margin-bottom: 1rem;
}
.title {
  margin: 0;
  padding: 0;
  overflow-x: auto;
  font-size: 1.5rem;
  font-weight: bold;
}
.section-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 1rem;
  background-color: var(--section-background);
}

.section-content p {
  margin: 0rem 0.5rem 1rem;
}

.github-button {
  display: flex;
  align-items: center;
  padding: 0.2rem 1rem;
  padding-right: 0.2rem;
  height: 2.4rem;
  color: white;
  text-decoration: none;
  border-radius: 0.4rem;
  font-weight: 500;
  transition: background-color 0.15s;
  user-select: none;
  border: var(--button-github-border);
  background-color: var(--button-github-background);
}

.github-button img {
  height: 1.2rem;
  padding-right: 0.5rem;
}

.github-button.disabled {
  background-color: unset;
  cursor: not-allowed;
  color: var(--button-github-color-disabled);
}

.github-button:hover:not(.disabled) {
  background-color: var(--button-github-background-hover);
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

@media screen and (max-width: 450px) {
  .title {
    font-size: 1.2rem;
  }
}
</style>
