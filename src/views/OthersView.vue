<script setup lang="ts">
import type { Project } from '@/types/project-type'
import { StatusType } from '@/types/status-type'
import StatusComponent from '@/components/StatusComponent.vue'
import TechnologyList from '@/components/TechnologyList.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'

function githubUrl(username: string, projectName: string): string {
  return `https://github.com/${username}/${projectName}/`
}

function myGithubUrl(projectName: string): string {
  return githubUrl('ArthurLeFloch', projectName)
}

const data: Project[] = [
  {
    projectName: 'rmx',
    description:
      'CLI to delete files based on their extensions. This was also to apply what I learnt from the Rust Book. Developed inside Neovim.',
    githubUrl: myGithubUrl('rmx'),
    technologies: ['Rust'],
    status: StatusType.DONE,
  },
  {
    projectName: 'Software Testing Project',
    description:
      'Optimization school group project, made to learn tests in depth (code coverage, mutation testing, mocks, spies, stubs, ...). It uses packages like Mockito, Pitest, as well as OR-Tools for optimization.',
    githubUrl: null,
    technologies: ['Java', 'Maven', 'JUnit'],
    status: StatusType.DONE,
  },
  {
    projectName: 'Advent of Code 2024',
    description:
      'My attempt to solve Advent of Code 2024 with one language per day, until day 20 (Python, C, Kotlin, C#, Powershell, Ada, Go, C++, Bash, Java, TypeScript, PHP, Ruby, ASMx86, Rust, Zig, Dart, Julia, Swift, R).',
    githubUrl: myGithubUrl('AdventOfCode2024'),
    technologies: [],
    status: StatusType.PAUSED,
  },
  {
    projectName: 'Peer-to-Peer',
    description: 'Peer-to-Peer CLI school project. Client made in Java, Server made in C.',
    githubUrl: null,
    technologies: ['Java', 'Gradle', 'C'],
    status: StatusType.DONE,
  },
  {
    projectName: 'Password Manager',
    description:
      'Android application to store passwords securely, locally. Passwords are encrypted with a primary key.',
    githubUrl: myGithubUrl('PasswordManager'),
    technologies: ['Kotlin'],
    status: StatusType.DONE,
  },
  {
    projectName: 'Tower Defense V2',
    description:
      'Optimized Tower Defense developed with an SDL-based game framework. Data-driven, supports various locales.',
    githubUrl: myGithubUrl('TowerDefenseV2'),
    technologies: ['Python', 'SDL'],
    status: StatusType.PAUSED,
  },
  {
    projectName: 'Random API',
    githubUrl: null,
    description: 'Basic NodeJS API generating random floats between 0 and 1.',
    technologies: ['Nodejs', 'npm', 'Express'],
    status: StatusType.DONE,
  },
]
</script>

<template>
  <div id="section-container">
    <div v-for="(item, index) in data" :key="index" class="section">
      <h3 class="section-title">
        {{ item.projectName }}
        <StatusComponent :status="item.status" />
      </h3>
      <TechnologyList v-if="item.technologies.length" :technologies="item.technologies" />
      <div class="section-content">
        <p>{{ item.description }}</p>
      </div>
      <div v-if="item.githubUrl">
        <a :href="item.githubUrl" target="_blank" class="github-button">
          <img src="/assets/icons/github.svg" alt="GitHub" />
          <span class="button-text">See on GitHub</span>
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
  padding: 0 1rem;
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
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 1rem;
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
</style>
