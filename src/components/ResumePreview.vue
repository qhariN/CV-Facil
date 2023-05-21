<script setup>
import { onMounted } from 'vue'
import { useResumePreviewerStore } from '../stores/resume-previewer'

const resumePreviewer = useResumePreviewerStore()

onMounted(() => {
  resumePreviewer.render()
})
</script>

<template>
  <div class="w-1/2 min-h-screen bg-gray-100 flex flex-col">
    <div>
      header
    </div>
    <div class="grow flex items-center justify-center">
      <canvas id="the-canvas" class="rounded-lg shadow"></canvas>
    </div>
    <div>footer</div>
  </div>
</template>