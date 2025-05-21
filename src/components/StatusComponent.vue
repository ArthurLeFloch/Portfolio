<script setup lang="ts">
defineProps<{
  status: 'wip' | 'paused' | 'done'
}>()
</script>

<template>
  <span
    :class="{
      dot: true,
      'dot-loading': status === 'wip',
      'dot-paused': status === 'paused',
    }"
    :title="status === 'wip' ? 'Work In Progress' : status === 'paused' ? 'Paused' : 'Done'"
  ></span>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
}

.dot {
  align-self: center;
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #4a8cff;
  border-radius: 50%;
  margin-left: 8px;
  vertical-align: middle;
}

.dot-loading {
  background-color: #cc8800;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot-paused {
  background-color: #666;
}
</style>
