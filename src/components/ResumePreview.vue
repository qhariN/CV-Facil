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
    <div class="flex justify-center items-center gap-3 p-5 pt-8">
      <button @click="resumePreviewer.previousPage" :disabled="resumePreviewer.currentPage <= 1" type="button" class="w-10 h-10 bg-gray-200 rounded-full disabled:bg-gray-50">&lt;</button>
      Página {{ resumePreviewer.currentPage }} de {{ resumePreviewer.totalPages }}
      <button @click="resumePreviewer.nextPage" :disabled="resumePreviewer.currentPage >= resumePreviewer.totalPages" type="button" class="w-10 h-10 bg-gray-200 rounded-full disabled:bg-gray-50">&gt;</button>
    </div>
    <div class="grow flex items-center justify-center">
      <canvas id="the-canvas" class="rounded-lg shadow"></canvas>
    </div>
    <div class="flex justify-center items-center gap-3 p-5 pb-8">
      <button @click="resumePreviewer.download" type="button" class="px-7 py-4 bg-gray-200 rounded-full">
        Descargar CV
      </button>
    </div>
  </div>
</template>