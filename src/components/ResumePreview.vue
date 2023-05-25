<script setup>
import { useResumePreviewerStore } from '../stores/resume-previewer'
import ChevronLeft from './icons/ChevronLeft.vue'
import ChevronRight from './icons/ChevronRight.vue'

const resumePreviewer = useResumePreviewerStore()
</script>

<template>
  <div class="w-1/2 min-h-screen bg-gray-100 flex flex-col">
    <div class="flex justify-center items-center gap-3 p-5 pt-12 text-zinc-800">
      <button @click="resumePreviewer.previousPage" :disabled="resumePreviewer.currentPage <= 1" type="button" class="p-1 bg-zinc-400 rounded-full">
        <ChevronLeft class="w-6 h-6" />
      </button>
      Página {{ resumePreviewer.currentPage }} de {{ resumePreviewer.totalPages }}
      <button @click="resumePreviewer.nextPage" :disabled="resumePreviewer.currentPage >= resumePreviewer.totalPages" type="button" class="p-1 bg-zinc-400 rounded-full">
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
    <div class="grow flex items-center justify-center">
      <canvas id="the-canvas" class="rounded-lg shadow"></canvas>
    </div>
    <div class="flex justify-center items-center gap-3 p-5 pb-12">
      <button @click="resumePreviewer.download" type="button" class="px-7 py-4 bg-gray-200 rounded-full">
        Descargar CV
      </button>
    </div>
  </div>
</template>
