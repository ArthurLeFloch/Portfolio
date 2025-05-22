<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CarouselComponent from '@/components/Carousel/CarouselComponent.vue'
import CarouselDescription from '@/components/Carousel/CarouselDescription.vue'

import type { WebProject } from '@/types/project-type.ts'

import { guessLanguage, Language } from '@/utils/guess-lang'

const data = ref<WebProject[]>([])

async function loadData(language: Language): Promise<WebProject[]> {
  const dataFile = await fetch(`${import.meta.env.BASE_URL}content/web/${language}.json`)
  return await dataFile.json()
}

onMounted(async () => {
  data.value = await loadData(guessLanguage())

  addEventListener('languagechange', async (event: Event) => {
    const newLanguage = (event as CustomEvent).detail.language
    data.value = await loadData(newLanguage)
  })
})

const selectedProjectIndex = ref<number>(0)
const selectedProject = computed<WebProject | null>(
  () => data.value[selectedProjectIndex.value] || null,
)
const onItemSelected = (index: number) => {
  selectedProjectIndex.value = index
}
const carouselRef = ref<InstanceType<typeof CarouselComponent> | null>(null)

function scrollTo(index: number) {
  if (carouselRef.value) {
    carouselRef.value.scrollTo(index)
  }
}
</script>

<template>
  <div class="carousel-showcase">
    <div class="carousel-content">
      <CarouselComponent
        ref="carouselRef"
        v-if="data.length !== 0"
        :projects="
          data.map((project) => ({
            title: project.title,
            image: project.imageUrl,
          }))
        "
        @onItemSelected="onItemSelected($event)"
      />
    </div>
    <div class="carousel-sidebar">
      <div class="carousel-description">
        <CarouselDescription
          v-if="selectedProject"
          :project="selectedProject"
          :hasNextButton="selectedProjectIndex < data.length - 1"
          :hasBackButton="selectedProjectIndex > 0"
          @onBackButtonClicked="scrollTo(selectedProjectIndex - 1)"
          @onNextButtonClicked="scrollTo(selectedProjectIndex + 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-title {
  width: 100%;
  text-align: center;
}

.carousel-sidebar {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.carousel-showcase {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 1rem;
}

.carousel-content {
  flex-grow: 1;
  background-color: var(--primary-background);
  border-radius: 1rem;
  margin: 0 0.5rem;
  padding: 0 0.5rem;
  width: calc(100% - 2rem);

  margin-left: 0;
  padding-left: 0;
}

.carousel-description {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 500px;
  flex-shrink: 0;
  margin: 1rem 0;
}

/* Borderless mode */
@media screen and (max-width: 992px), screen and (max-width: 1400px) and (max-height: 800px) {
  .carousel-content {
    margin: 1rem;
    margin-top: 0;
    padding: 0 0.5rem;
  }
  .carousel-showcase {
    background-color: var(--secondary-background);
    padding: 0;
  }
  .carousel-description {
    margin: 0;
  }
}

@media screen and (max-width: 992px) {
  #content {
    padding: 0;
  }
  .carousel-content {
    flex-grow: 0;
    flex-shrink: 0;
    height: 40%;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
  }
  .carousel-showcase {
    flex-direction: column;
    gap: 0rem;
  }
  .carousel-description {
    width: 100%;
    height: 100%;
  }
}
</style>
