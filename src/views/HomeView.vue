<script setup>
import { RouterLink } from 'vue-router'

function infojobsLogin () {
  window.location.href = '/api/infojobs/login'
}
</script>

<template>
  <div class="max-w-screen-md text-center z-10">
    <h1 class="text-8xl text-transparent bg-clip-text bg-gradient-to-t from-zinc-800 to-black/80">CV Fácil</h1>
    <p class="text-xl mt-5">
      ¡Crea tu currículum profesional en minutos!<br>
      Obtén un PDF listo para conquistar tu próxima oportunidad laboral
    </p>
    <div class="mt-9 flex justify-center items-center gap-3">
      <RouterLink to="/wizard" class="text-xl text-white bg-gradient-to-t from-zinc-800 to-black/80 hover:bg-black transition-colors px-8 py-4 rounded-xl">
        Comenzar
      </RouterLink>
      <p class="text-xl">ó</p>
      <button @click="infojobsLogin" class="text-xl bg-gray-100/30 hover:bg-gray-100/50 border border-gray-100/30 hover:border-black transition-colors px-8 py-4 rounded-xl">
        Importar de InfoJobs
      </button>
    </div>
  </div>
</template>
