<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  imageSrc: string
  title: string
}>()

const isMobileView = ref(window.innerWidth <= 992)

onMounted(() => {
  const updateDimensions = () => {
    isMobileView.value = window.innerWidth <= 992
  }

  window.addEventListener('resize', updateDimensions)
})
</script>

<template>
  <div class="carousel-item">
    <img :src="imageSrc" :alt="title" class="carousel-image" />
    <div v-if="!isMobileView" class="carousel-item-title">
      <b>{{ title }}</b>
    </div>
  </div>
</template>

<style scoped>
.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.carousel-item-title {
  color: white;
  min-width: 50%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background: rgba(0, 0, 0, 0.6);
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
  text-align: center;
}
</style>
