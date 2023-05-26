<script setup>
import { useInfojobsStore } from '../stores/infojobs'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import { useResumePreviewerStore } from '../stores/resume-previewer'
import ChevronLeft from './icons/ChevronLeft.vue'
import ChevronRight from './icons/ChevronRight.vue'

const resumePreviewer = useResumePreviewerStore()
const infojobsStore = useInfojobsStore()
const professionalProfileStore = useProfessionalProfileStore()

async function exportCurriculum () {
  const cvtext = {
    cvtext: professionalProfileStore.description
  }
  infojobsStore.updateCvText('d43a6862-40fa-4d9f-8865-06c2caf56776', cvtext)
}
</script>

<template>
  <div class="w-1/2 min-h-screen flex flex-col">
    <div class="flex justify-center items-center gap-3 p-5 pt-12 text-stone-600">
      <button @click="resumePreviewer.previousPage" :disabled="resumePreviewer.currentPage <= 1" type="button" class="p-2 bg-stone-300/50 text-stone-500 disabled:text-stone-400/70 disabled:cursor-not-allowed rounded-full">
        <ChevronLeft class="w-6 h-6" />
      </button>
      Página {{ resumePreviewer.currentPage }} de {{ resumePreviewer.totalPages }}
      <button @click="resumePreviewer.nextPage" :disabled="resumePreviewer.currentPage >= resumePreviewer.totalPages" type="button" class="p-2 bg-stone-300/50 text-stone-500 rounded-full">
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
    <div class="grow flex items-center justify-center relative">
      <div class="bg w-full h-full absolute"></div>
      <canvas id="the-canvas" class="rounded-lg opacity-70 shadow-lg shadow-stone-400/30"></canvas>
    </div>
    <div class="flex justify-center items-center gap-3 p-5 pb-14">
      <button @click="exportCurriculum" type="button" class="px-7 py-4 bg-gray-200 rounded-full">
        Exportar a InfoJobs
      </button>
      <button @click="resumePreviewer.download" type="button" class="px-7 py-4 bg-gray-200 rounded-full">
        Descargar CV
      </button>
    </div>
  </div>
</template>

<style>
.bg {
  background-image: radial-gradient(at 27% 37%,#3a8bfd 0,transparent 0),radial-gradient(at 97% 21%,#855afc 0,transparent 50%),radial-gradient(at 52% 99%,#E93E40 0,transparent 50%),radial-gradient(at 10% 29%,#167DB7 0,transparent 50%),radial-gradient(at 97% 96%,#F1C40F 0,transparent 50%),radial-gradient(at 33% 50%,#167DB7 0,transparent 50%),radial-gradient(at 79% 53%,#FF6340 0,transparent 50%);
  filter: blur(100px) saturate(150%);
  opacity: .1;
  z-index: -1;
}
</style>
