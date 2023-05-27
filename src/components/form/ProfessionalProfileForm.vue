<script setup>
import { useProfessionalProfileStore } from '../../stores/professional-profile'
import BasicTextarea from '../BasicTextarea.vue'

const professionalProfileStore = useProfessionalProfileStore()

const descriptionExample = 'Más de cinco años de experiencia como desarrollador web, especializado en React y Node.js, contribuyendo a proyectos empresariales y plataformas de comercio electrónico de manera colaborativa'
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tu perfil profesional
      </h2>
      <p class="font-bold text-base text-stone-400">
        Destaca tus habilidades, experiencia y logros clave en un resumen conciso.
        Describe tus fortalezas principales, tu pasión por tu campo y cómo puedes agregar valor a una organización.
      </p>
    </div>
    <BasicTextarea v-model="professionalProfileStore.description" id="description" label="Descripción" :placeholder="descriptionExample" />
    <div class="flex gap-4">
      <RouterLink to="/wizard" class="ms-auto text-xl bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Volver
      </RouterLink>
      <RouterLink :to="{ name: 'work-experience' }" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Siguiente
      </RouterLink>
    </div>
  </div>
</template>
