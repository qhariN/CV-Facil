<script setup>
import { onMounted } from 'vue'
import { useInfojobsStore } from '../stores/infojobs'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import { useResumePreviewerStore } from '../stores/resume-previewer'
import ChevronLeft from './icons/ChevronLeft.vue'
import ChevronRight from './icons/ChevronRight.vue'

const resumePreviewer = useResumePreviewerStore()
const infojobsStore = useInfojobsStore()
const professionalProfileStore = useProfessionalProfileStore()

onMounted(() => {
  resumePreviewer.isRendering = true
  resumePreviewer.render()
})

async function exportCurriculum () {
  const cvtext = {
    cvtext: professionalProfileStore.description
  }
  infojobsStore.updateCvText('d43a6862-40fa-4d9f-8865-06c2caf56776', cvtext)
}
</script>

<template>
  <div class="w-1/2 min-h-screen flex justify-start px-20 py-12">
    <div class="flex flex-col gap-5 w-full max-w-xl">
      <div class="flex justify-center items-center gap-5 text-stone-600">
        <button @click="resumePreviewer.previousPage" :disabled="resumePreviewer.currentPage <= 1" type="button" class="p-2 bg-white/60 transition duration-300 text-stone-500 disabled:text-stone-300 disabled:cursor-not-allowed rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
          <ChevronLeft class="w-6 h-6" />
        </button>
        Página {{ resumePreviewer.currentPage }} de {{ resumePreviewer.totalPages }}
        <button @click="resumePreviewer.nextPage" :disabled="resumePreviewer.currentPage >= resumePreviewer.totalPages" type="button" class="p-2 bg-white/60 transition duration-300 text-stone-500 disabled:text-stone-300 disabled:cursor-not-allowed rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>
      <div class="grow flex items-center justify-center relative min-w-[500px]">
        <div class="bg w-full h-full absolute"></div>
        <Transition name="fade">
          <canvas v-show="!resumePreviewer.isRendering" id="the-canvas" class="rounded-xl opacity-70 shadow-lg shadow-stone-400/20"></canvas>
        </Transition>
        <Transition name="fade">
          <div v-show="resumePreviewer.isRendering" class="absolute flex flex-col items-center gap-3">
            <h2 class="text-xl font-bold text-center text-stone-700">
              Generando vista previa
            </h2>
            <div class="race-by"></div>
          </div>
        </Transition>
      </div>
      <div class="flex justify-center items-center gap-3">
        <button @click="exportCurriculum" type="button" class="group text-xl bg-stone-50 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
          <span class="group-hover:bg-clip-text group-hover:text-transparent bg-gradient-to-r group-hover:from-[#23536E] group-hover:to-[#167DB7]">Exportar a InfoJobs</span>
        </button>
        <button @click="resumePreviewer.download" type="button" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
          Descargar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: radial-gradient(at 27% 37%,#3a8bfd 0,transparent 0),radial-gradient(at 97% 21%,#855afc 0,transparent 50%),radial-gradient(at 52% 99%,#E93E40 0,transparent 50%),radial-gradient(at 10% 29%,#167DB7 0,transparent 50%),radial-gradient(at 97% 96%,#F1C40F 0,transparent 50%),radial-gradient(at 33% 50%,#167DB7 0,transparent 50%),radial-gradient(at 79% 53%,#FF6340 0,transparent 50%);
  filter: blur(100px) saturate(150%);
  opacity: .1;
  z-index: -10;
}
</style>
