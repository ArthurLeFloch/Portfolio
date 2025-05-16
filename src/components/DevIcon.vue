<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const filename = computed(() => {
  let res = props.name.toLowerCase().replace(/ /g, '').replace(/-/g, '')
  if (res === 'c#') {
    res = 'csharp'
  } else if (res === 'c++') {
    res = 'cpp'
  }
  return res
})
</script>

<template>
  <div class="icon-container">
    <img :src="`/assets/devicons/${filename}.svg`" :alt="props.name" />
    <p>{{ props.name }}</p>
  </div>
</template>

<style scoped>
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0.5rem;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 0.5rem;
  background-color: var(--base-background);
  padding: 0.25rem 0.5rem;
}

img {
  width: 1.5rem;
  height: 1.5rem;
  user-select: none;
}

p {
  font-size: 0.85rem;
  margin: 0;
  white-space: nowrap;
}
</style>
