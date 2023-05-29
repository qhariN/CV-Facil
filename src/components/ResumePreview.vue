<script setup>
import { onMounted } from 'vue'
import { useInfojobsStore } from '../stores/infojobs'
import { useResumePreviewerStore } from '../stores/resume-previewer'
import ChevronLeft from './icons/ChevronLeft.vue'
import ChevronRight from './icons/ChevronRight.vue'

const resumePreviewer = useResumePreviewerStore()
const infojobsStore = useInfojobsStore()

onMounted(() => {
  resumePreviewer.isRendering = true
  resumePreviewer.render()
})
</script>

<template>
  <div class="w-1/2 min-h-screen overflow-auto">
    <div class="w-full min-h-full flex justify-start px-12 2xl:px-20 py-12">

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
        <div class="grow flex items-center justify-center relative min-w-[500px] min-h-[707px]">
          <div class="bg w-full h-full absolute"></div>
          <Transition name="fade">
            <canvas v-show="!resumePreviewer.isRendering" id="the-canvas" class="rounded-xl opacity-70 shadow-lg shadow-stone-400/20"></canvas>
          </Transition>
          <Transition name="fade">
            <div v-show="resumePreviewer.isRendering" class="absolute flex flex-col items-center">
              <h2 class="text-xl font-bold text-center text-stone-700">
                Generando vista previa
              </h2>
              <p class="text-sm text-stone-500 mt-1">Paciencia, esto puede tardar unos segundos</p>
              <div class="race-by mt-3"></div>
            </div>
          </Transition>
        </div>
        <div class="flex justify-center items-center gap-3">
          <button @click="infojobsStore.login('export')" type="button" class="group text-xl bg-stone-50 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
            <span class="group-hover:bg-clip-text group-hover:text-transparent bg-gradient-to-r group-hover:from-[#23536E] group-hover:to-[#167DB7]">Exportar datos a InfoJobs</span>
          </button>
          <button @click="resumePreviewer.download" type="button" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
            Descargar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: radial-gradient(at 27% 37%,#00c7e4 0,transparent 0),radial-gradient(at 97% 21%,#a568f6 0,transparent 50%),radial-gradient(at 52% 99%,#e63d87 0,transparent 50%),radial-gradient(at 10% 29%,#167DB7 0,transparent 50%),radial-gradient(at 97% 96%,#fdd67e 0,transparent 50%),radial-gradient(at 33% 50%,#167DB7 0,transparent 50%),radial-gradient(at 79% 53%,#e63d87 0,transparent 50%);
  filter: blur(100px) saturate(150%);
  opacity: .1;
  z-index: -10;
}
</style>
