<script setup lang="ts">
import DevIcon from '@/components/DevIcon.vue'

defineProps<{
  technologies: string[]
}>()
</script>

<template>
  <div class="technologies-container">
    <div class="technologies">
      <DevIcon v-for="(tech, index) in technologies" :name="tech" :key="index" />
    </div>
  </div>
</template>

<style scoped>
.technologies-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.technologies {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
