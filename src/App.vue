<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/NavigationBar.vue'
</script>

<template id="app">
  <Navbar />
  <div id="content">
    <router-view />
  </div>
</template>

<style scoped>
#content {
  display: flex;
  max-width: 1400px;
  width: 100%;
  align-self: center;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  margin: 0 2rem;
}

@media screen and (max-width: 992px) {
  #content {
    padding: 0;
  }
}
</style>
