<script setup lang="ts">
import { RouterLink } from 'vue-router'

import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'
</script>

<template>
  <nav>
    <div id="nav-container">
      <RouterLink id="name" to="/"> Arthur Le Floch </RouterLink>

      <RouterLink to="/web">{{ $t('web_projects_title') }}</RouterLink>
      <RouterLink to="/others">{{ $t('other_projects_title') }}</RouterLink>

      <a
        id="github-button"
        href="https://github.com/ArthurLeFloch"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/icons/github.svg" alt="GitHub" />
        <ArrowRightIcon />
      </a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  background-color: var(--secondary-background);
  padding: 0.5rem 0;

  width: 100%;
  z-index: 1;
}

#nav-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  padding: 0 1rem;

  max-width: 1400px;
  width: 100%;
}

#name {
  user-select: none;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  color: var(--text-primary);
  text-underline-offset: 0.3rem;
}
#name:hover {
  text-decoration: underline;
}

#github-button {
  padding-left: 1rem;
  padding-left: 0.5rem;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  border: var(--button-github-border);
  border-radius: 0.8rem;
  color: white;
  background-color: var(--button-github-background);
  text-decoration: none;
}

#github-button img {
  height: 1.4rem;
}

#github-button:hover {
  background-color: var(--button-github-background-hover);
}

a.router-link-active {
  color: var(--text-primary);
}
a:not(.router-link-active) {
  color: var(--text-secondary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 992px), screen and (max-width: 1400px) and (max-height: 800px) {
  #nav-container {
    max-width: 100%;
  }
}

@media screen and (max-width: 450px) {
  #name {
    font-size: 1rem;
  }
  a {
    font-size: 0.9rem;
  }
}
</style>
