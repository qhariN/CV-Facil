<script setup>
import { useProfessionalProfileStore } from '../../stores/professional-profile'
import BasicTextarea from '../BasicTextarea.vue'
import PrimaryRouterButton from '../PrimaryRouterButton.vue'
import SecondaryRouterButton from '../SecondaryRouterButton.vue'

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
      <SecondaryRouterButton to="/wizard" class="ms-auto">
        Volver
      </SecondaryRouterButton>
      <PrimaryRouterButton to-route-name="work-experience">
        Siguiente
      </PrimaryRouterButton>
    </div>
  </div>
</template>
