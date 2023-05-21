<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="max-w-screen-md text-center">
      <h1 class="text-8xl">CV Fácil</h1>
      <p class="text-xl mt-5">
        ¡Crea tu currículum profesional en minutos!<br>
        Obtén un PDF listo para conquistar tu próxima oportunidad laboral
      </p>
      <div class="mt-12">
        <RouterLink class="text-2xl text-white bg-black px-8 py-4 rounded-full" to="/about">Comenzar</RouterLink>
      </div>
    </div>
  </main>
</template>
