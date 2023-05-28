<script setup>
import { RouterLink } from 'vue-router'
import { useInfojobsStore } from '../stores/infojobs'

const infojobsStore = useInfojobsStore()
</script>

<template>
  <div class="max-w-screen-md text-center">
    <h1 class="text-8xl text-transparent bg-clip-text bg-gradient-to-t from-stone-700 to-black/90">CV Fácil</h1>
    <p class="text-xl mt-5">
      ¡Crea tu currículum profesional en minutos!<br>
      Obtén un PDF listo para conquistar tu próxima oportunidad laboral
    </p>
    <div class="mt-9 flex justify-center items-center gap-3">
      <RouterLink to="/wizard" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Comenzar
      </RouterLink>
      <p class="text-xl">ó</p>
      <button @click="infojobsStore.login('import')" class="group text-xl bg-stone-100/30 border border-transparent hover:border-[#1D668F] transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20" type="button">
        <span class="group-hover:bg-clip-text group-hover:text-transparent bg-gradient-to-r group-hover:from-[#23536E] group-hover:to-[#167DB7]">Importar de InfoJobs</span>
      </button>
    </div>
  </div>
</template>
