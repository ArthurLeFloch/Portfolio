<script setup lang="ts">
import type { WebProject } from '@/types/project-type'
import StatusComponent from '@/components/StatusComponent.vue'
import TechnologyList from '@/components/TechnologyList.vue'
import ChevronIcon from '@/icons/ChevronIcon.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'

defineProps<{
  project: WebProject
  hasNextButton: boolean
  hasBackButton: boolean
}>()

const emit = defineEmits(['onBackButtonClicked', 'onNextButtonClicked'])
</script>

<template>
  <div class="description-container">
    <div class="description-header">
      <button
        class="description-nav-button"
        @click="emit('onBackButtonClicked')"
        :disabled="!hasBackButton"
      >
        <ChevronIcon orientation="left" />
      </button>
      <div class="title-container">
        <span class="title">{{ project.projectName }}</span>
        <StatusComponent :status="project.status" />
      </div>
      <button
        class="description-nav-button"
        @click="emit('onNextButtonClicked')"
        :disabled="!hasNextButton"
      >
        <ChevronIcon orientation="right" />
      </button>
    </div>

    <TechnologyList
      v-if="project.technologies && project.technologies.length > 0"
      :technologies="project.technologies"
    />
    <p class="description">{{ project.description }}</p>

    <template class="links">
      <div class="website-buttons" v-if="project.websiteUrl || project.devWebsiteUrl">
        <a v-if="project.devWebsiteUrl" :href="project.devWebsiteUrl" target="_blank" class="link">
          <span class="button-text">See dev website</span>
          <ArrowRightIcon />
        </a>
        <a v-if="project.websiteUrl" :href="project.websiteUrl" target="_blank" class="link">
          <span class="button-text">See website</span>
          <ArrowRightIcon />
        </a>
      </div>
      <a
        :href="project.githubUrl || undefined"
        :class="{ disabled: !project.githubUrl }"
        target="_blank"
        class="link github"
      >
        <template v-if="project.githubUrl !== null">
          <img src="/assets/icons/github.svg" alt="GitHub" />
          <span class="button-text">GitHub Repository</span>
          <ArrowRightIcon />
        </template>
        <template v-else>
          <div class="github-fallback">GitHub Repository not available</div>
        </template>
      </a>
    </template>
  </div>
</template>

<style scoped>
.description-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.description-nav-button:hover {
  transition: background-color 0.2s;
  background-color: #0003;
  border-radius: 50%;
}
.description-nav-button:active {
  background-color: #0005;
}
.description-nav-button svg {
  width: 2.5rem;
  aspect-ratio: 1;
  flex-shrink: 0;
  color: var(--text-primary);
  transition: color 0.2s;
}

.description-nav-button:disabled {
  cursor: default;
  background-color: transparent;
}
.description-nav-button:disabled svg {
  display: none;
}

.description-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.description-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1.5rem;
  background-color: var(--secondary-background);
  border-radius: 8px;
  max-width: 500px;
  max-height: 700px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: auto;
  flex-grow: 1;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  text-wrap: nowrap;
  overflow-x: auto;
  font-weight: bold;
  color: var(--text-primary);
}

.description {
  overflow-y: auto;
  flex-grow: 1;
  flex-basis: 0;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link {
  display: flex;
  align-items: center;
  padding: 0.2rem 1rem;
  padding-right: 0.5rem;
  height: 2.4rem;
  background-color: var(--button-see-background);
  color: white;
  text-decoration: none;
  border-radius: 0.4rem;
  font-weight: 500;
  transition: background-color 0.15s;
  user-select: none;
}

.link:hover {
  background-color: var(--button-see-background-hover);
}

.link.github {
  gap: 0.5rem;
  border: var(--button-github-border);
  background-color: var(--button-github-background);
}

.link.github img {
  height: 1.2rem;
}

.link.github.disabled {
  background-color: unset;
  cursor: not-allowed;
  color: var(--button-github-color-disabled);
}

.link.github:hover:not(.disabled) {
  background-color: var(--button-github-background-hover);
}

.github-fallback {
  text-align: center;
  width: 100%;
}

.button-text {
  flex-grow: 1;
  flex-basis: 0;
  text-align: left;
}

.website-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
}
.website-buttons .link {
  flex-grow: 1;
  flex-basis: 0;
  justify-content: center;
  width: 100%;
}

.link.disabled {
  cursor: not-allowed;
}

@media screen and (max-width: 450px) {
  .links {
    flex-direction: column;
  }

  .website-buttons {
    flex-direction: column;
  }
}

@media screen and (max-width: 992px), screen and (max-width: 1400px) and (max-height: 800px) {
  .title {
    font-size: 1.3rem;
  }
  .description {
    margin: 0;
    margin-bottom: 1rem;
  }
  .description-header {
    margin-bottom: 0.5rem;
  }
  .description-container {
    margin: 0;
    padding: 0 1rem 1rem 0;
    border-radius: 0;
    max-height: unset;
  }
}

@media screen and (max-width: 992px) {
  .description-container {
    width: 100%;
    max-width: 600px;
    margin: 0 1rem;
    padding: 0;
    padding-bottom: 1rem;
  }

  .link {
    display: flex;
  }
}
</style>
