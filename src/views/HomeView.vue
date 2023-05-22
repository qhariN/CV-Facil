<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-gray-100 flex justify-center items-center relative">
    <img src="@/assets/light-accent-compressed.png" alt="bg" class="absolute opacity-60">
    <div class="max-w-screen-md text-center z-10">
      <h1 class="text-8xl text-transparent bg-clip-text bg-gradient-to-t from-zinc-800 to-black/80">CV Fácil</h1>
      <p class="text-xl mt-5">
        ¡Crea tu currículum profesional en minutos!<br>
        Obtén un PDF listo para conquistar tu próxima oportunidad laboral
      </p>
      <div class="mt-9 flex justify-center items-center gap-3">
        <RouterLink class="text-xl text-white bg-gradient-to-t from-zinc-800 to-black/80 hover:bg-black transition-colors px-8 py-4 rounded-xl" to="/about">
          Comenzar
        </RouterLink>
        <p class="text-xl">ó</p>
        <RouterLink class="text-xl bg-gray-100/30 hover:bg-gray-100/50 border border-gray-100/30 hover:border-black transition-colors px-8 py-4 rounded-xl" to="/about">
          Importar de InfoJobs
        </RouterLink>
      </div>
    </div>
  </main>
</template>
