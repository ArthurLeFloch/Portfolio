<script setup lang="ts">
import { ref, computed } from 'vue'
import CarouselComponent from '@/components/Carousel/CarouselComponent.vue'
import CarouselDescription from '@/components/Carousel/CarouselDescription.vue'

import type { WebProject } from '@/types/project-type.ts'
import { StatusType } from '@/types/status-type.ts'
import { myGithubUrl, githubUrl, assetUrl } from '@/utils/url-helper.ts'

const data: WebProject[] = [
  {
    projectName: 'This Portfolio',
    websiteUrl: 'https://alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: myGithubUrl('Portfolio'),
    description: 'Portfolio made with VueJS.',
    imageSrc: assetUrl('portfolio.webp'),
    status: StatusType.WORK_IN_PROGRESS,
    technologies: ['TypeScript', 'VueJS', 'GitHub Actions'],
  },
  {
    projectName: 'Previous Portfolio',
    websiteUrl: 'https://old.alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: null,
    description: 'Portfolio made with VueJS.',
    imageSrc: assetUrl('old-portfolio.webp'),
    status: StatusType.DONE,
    technologies: ['JavaScript', 'VueJS'],
  },
  {
    projectName: 'Vulnerability Checker',
    websiteUrl: 'https://rgu.alfloch.fr/',
    devWebsiteUrl: 'https://rgu-dev.alfloch.fr/',
    githubUrl: null,
    description: 'Internship project to check for vulnerabilities (CWEs) in C/C++/Java code.',
    imageSrc: assetUrl('checker.webp'),
    status: StatusType.WORK_IN_PROGRESS,
    technologies: [
      'pnpm',
      'Angular',
      'TypeScript',
      'Python',
      'Redis',
      'FastAPI',
      'JWT',
      'Gemini',
      'Pytest',
      'Playwright',
      'GitHub Actions',
    ],
  },
  {
    projectName: 'Nebulift',
    githubUrl: githubUrl('Mentoring-Bordeaux', 'nebulift'),
    websiteUrl: null,
    devWebsiteUrl: null,
    description:
      'Platform Engineering project, school group project. Allows to generate a cloud infrastructure and a GitHub project from a template, configured in a NuxtJS frontend.',
    imageSrc: assetUrl('nebulift.webp'),
    status: StatusType.DONE,
    technologies: ['NuxtJS', 'Tailwind', 'C#', 'Pulumi', 'Azure', 'GitHub Actions'],
  },
  {
    projectName: 'Image Editor',
    websiteUrl: 'https://image.alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: myGithubUrl('ImageEditor'),
    description:
      'Image editor using VueJS and Flask. Rotate, flip, crop, apply filters and effects. First part: original image, second: bilateral filter, third: custom transformation.',
    imageSrc: assetUrl('image.webp'),
    status: StatusType.WORK_IN_PROGRESS,
    technologies: ['VueJS', 'Python', 'Flask', 'JWT'],
  },
  {
    projectName: 'Chess',
    websiteUrl: 'https://dev.alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: null,
    description:
      'Chess game using React for the front-end. Back-end uses: NodeJS API, Flask (websockets), JWT tokens, MySQL database. Work in progress.',
    imageSrc: assetUrl('chess.webp'),
    status: StatusType.PAUSED,
    technologies: ['React', 'React Router', 'Python', 'Flask', 'JWT'],
  },
  {
    projectName: 'Vanlife',
    websiteUrl: 'https://vanlife.alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: myGithubUrl('vanlife'),
    description:
      'Website made following a React & React Router tutorial. Involves a NodeJS API to fetch data.',
    imageSrc: assetUrl('vanlife.webp'),
    status: StatusType.DONE,
    technologies: ['React', 'NodeJS', 'npm', 'Express'],
  },
  {
    projectName: 'Minecraft Skin API',
    websiteUrl: 'https://mcapi.alfloch.fr/merge/?user=PLAYER&accessory=coat',
    devWebsiteUrl: null,
    githubUrl: githubUrl('Eirbware', 'mc-skin-api'),
    description:
      'NodeJS API to fetch Minecraft skins, and apply accessories. Deployment using Docker.',
    imageSrc: assetUrl('mcskinapi.webp'),
    status: StatusType.DONE,
    technologies: ['TypeScript', 'NodeJS', 'npm', 'Express'],
  },
  {
    projectName: 'Garage',
    websiteUrl: null,
    devWebsiteUrl: null,
    githubUrl: myGithubUrl('Garage'),
    description:
      'Garage management system made in a school group project. I notably worked on the hydration of the website (process implemented in a lot of JavaScript frameworks).',
    imageSrc: assetUrl('garage.webp'),
    status: StatusType.DONE,
    technologies: ['PostgreSQL', 'PHP', 'JavaScript', 'Bootstrap'],
  },
  {
    projectName: 'Tic Tac Toe',
    websiteUrl: 'https://tictactoe.alfloch.fr/',
    devWebsiteUrl: null,
    githubUrl: myGithubUrl('TicTacToe'),
    description: 'Tic-Tac-Toe game using websockets. Needs 2 players to play.',
    imageSrc: assetUrl('tictactoe.webp'),
    status: StatusType.DONE,
    technologies: ['JavaScript'],
  },
]

const selectedProjectIndex = ref<number>(0)
const selectedProject = computed(() => data[selectedProjectIndex.value])
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
        :projects="
          data.map((project) => ({
            title: project.projectName,
            image: project.imageSrc,
          }))
        "
        @onItemSelected="onItemSelected($event)"
      />
    </div>
    <div class="carousel-sidebar">
      <div class="carousel-description">
        <CarouselDescription
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
