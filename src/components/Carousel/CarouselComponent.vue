<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type VNodeRef } from 'vue'
import CarouselItem from './CarouselItem.vue'

const props = defineProps<{
  projects: {
    image: string
    title: string
  }[]
}>()
const emit = defineEmits(['onItemSelected'])

const isMobileView = ref(window.innerWidth <= 992)
const focusedIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)
const firstSlide = ref<HTMLElement | null>(null)
const slideSize = ref(0)
const scrollStartPadding = ref(0)

const setSlideRef: VNodeRef = (el) => {
  if (el instanceof HTMLElement && !firstSlide.value) {
    firstSlide.value = el
  }
}

const updateDimensions = () => {
  isMobileView.value = window.innerWidth <= 992
  if (!carouselRef.value || !firstSlide.value) return

  scrollStartPadding.value = isMobileView.value
    ? (carouselRef.value.clientWidth - firstSlide.value.clientWidth) / 2
    : (carouselRef.value.clientHeight - firstSlide.value.clientHeight) / 2

  slideSize.value = isMobileView.value
    ? firstSlide.value.clientWidth
    : firstSlide.value.clientHeight
}

defineExpose({
  scrollTo,
})

function scrollTo(index: number) {
  if (index < 0 || index >= props.projects.length) return
  if (!carouselRef.value) return
  const pos = index * slideSize.value + scrollStartPadding.value
  carouselRef.value.scrollTo({
    top: isMobileView.value ? 0 : pos,
    left: isMobileView.value ? pos : 0,
    behavior: 'smooth',
  })
}

function handleScroll(event: Event) {
  const target = event.currentTarget as HTMLElement
  const scrollPosition = isMobileView.value ? target.scrollLeft : target.scrollTop

  const index = Math.round(scrollPosition / slideSize.value)

  if (index !== focusedIndex.value && index >= 0 && index < props.projects.length) {
    focusedIndex.value = index
    emit('onItemSelected', focusedIndex.value)
  }
}
let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  updateDimensions()

  window.addEventListener('resize', updateDimensions)
  carouselRef.value?.addEventListener('scroll', handleScroll)

  resizeObserver = new ResizeObserver(updateDimensions)
  if (carouselRef.value) {
    resizeObserver.observe(carouselRef.value)
  }

  scrollTo(0)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimensions)
  carouselRef.value?.removeEventListener('scroll', handleScroll)
  if (resizeObserver && carouselRef.value) {
    resizeObserver.unobserve(carouselRef.value)
  }
})
</script>
<template>
  <div class="carousel">
    <div class="carousel-items">
      <div
        class="carousel-track"
        ref="carouselRef"
        :style="{
          paddingBlock: isMobileView ? 'unset' : `${scrollStartPadding}px`,
          paddingInline: isMobileView ? `${scrollStartPadding}px` : 'unset',
        }"
      >
        <div
          v-for="(item, index) in projects"
          :key="index"
          class="carousel-slide"
          :ref="index === 0 ? setSlideRef : undefined"
        >
          <div
            class="carousel-slide-content"
            :style="{
              transform: `scale(${focusedIndex === index ? 1 : 0.9})`,
              opacity: focusedIndex === index ? 1 : 0.6,
            }"
            @click="scrollTo(index)"
          >
            <CarouselItem :imageSrc="item.image" :title="item.title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.carousel-items {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

.carousel-track {
  display: flex;
  user-select: none;
  flex-direction: column;
  overflow: hidden scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-stop: normal;
  scroll-behavior: smooth;
  padding-block-start: 1rem;
  padding-block-end: 1rem;
  height: 100%;
  scrollbar-width: none;
  min-width: 0;
}

.carousel-slide {
  scroll-snap-align: center;
  height: auto;
  overflow: hidden;
  flex-basis: 60vh;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 0;
}

.carousel-slide-content:hover {
  cursor: pointer;
}

.carousel-slide-content {
  overflow: hidden;
  height: 100%;
  border-radius: 1rem;
  border: 0.25rem solid black;
  transform-style: preserve-3d;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.5s ease-in-out;
}

@media (prefers-color-scheme: light) {
  .carousel-slide-content {
    border: 0.25rem solid #444;
  }
}

@media screen and (max-width: 992px) {
  .carousel-track {
    overflow: scroll hidden;
    scroll-snap-type: x mandatory;
    flex-direction: row;
  }

  .carousel-slide {
    height: 100%;
    flex-basis: 70vw;
  }
}
</style>
