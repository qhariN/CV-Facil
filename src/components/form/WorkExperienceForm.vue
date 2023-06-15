<script setup>
import { useWorkExperienceStore } from '../../stores/work-experience'
import BasicInput from '../BasicInput.vue'
import BasicTextarea from '../BasicTextarea.vue'
import PrimaryRouterButton from '../PrimaryRouterButton.vue'
import SecondaryButton from '../SecondaryButton.vue'
import SecondaryIconButton from '../SecondaryIconButton.vue'
import SecondaryRouterButton from '../SecondaryRouterButton.vue'
import SimpleTrash from '../icons/SimpleTrash.vue'

const workExperienceStore = useWorkExperienceStore()
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tu experiencia laboral
      </h2>
      <p class="font-bold text-base text-stone-400">
        Describe tu experiencia laboral, incluyendo tu puesto, la empresa, el periodo de tiempo y una breve descripción de las responsabilidades clave y los logros destacados.
      </p>
    </div>
    <div class="space-y-6">
      <template v-for="(experience, index) in workExperienceStore.experiences" :key="index">
        <div class="flex items-center gap-4 text-lg font-bold">
          <div class="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex justify-center items-center">{{ index + 1 }}</div>
          <span class="text-stone-700">
            {{ experience.company? experience.company : 'Experiencia laboral' }}
          </span>
          <SecondaryIconButton v-if="workExperienceStore.experiences.length > 1" @click="workExperienceStore.removeExperience(index)" class="ms-auto">
            <SimpleTrash class="w-5 h-5" />
          </SecondaryIconButton>
        </div>
        <div class="flex gap-6">
          <BasicInput v-model="experience.job" id="job-{{ index }}" label="Puesto" placeholder="Desarrollador web" class="grow" />
          <BasicInput v-model="experience.company" id="company-{{ index }}" label="Empresa" placeholder="Acme Inc." class="grow" />
        </div>
        <div class="flex gap-6">
          <BasicInput v-model="experience.location" id="location-{{ index }}" label="Ubicación" placeholder="Oakland, CA" class="grow" />
          <BasicInput v-model="experience.startingDate" id="starting-date-{{ index }}" label="Inicio" placeholder="Mayo 2019" class="grow" />
          <BasicInput v-model="experience.finishingDate" id="finishing-date-{{ index }}" label="Fin" placeholder="Actualidad" class="grow" />
        </div>
        <BasicTextarea v-model="experience.description" id="description-{{ index }}" label="Descripción" placeholder="Responsabilidades clave y logros destacados" />
      </template>
    </div>
    <div class="flex gap-4">
      <SecondaryButton @click="workExperienceStore.addExperience">
        Añadir experiencia
      </SecondaryButton>
      <SecondaryRouterButton to="/wizard" class="ms-auto">
        Volver
      </SecondaryRouterButton>
      <PrimaryRouterButton to-route-name="education">
        Siguiente
      </PrimaryRouterButton>
    </div>
  </div>
</template>
