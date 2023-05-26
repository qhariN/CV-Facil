<script setup>
import { useWorkExperienceStore } from '../../stores/work-experience'

const workExperienceStore = useWorkExperienceStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="workExperienceStore.addExperience">Añadir experiencia laboral</button>
    <template v-for="(experience, index) in workExperienceStore.experiences" :key="index">
      <div class="flex flex-col">
        <label for="job-{{ index }}">Puesto</label>
        <input v-model="experience.job" id="job-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="company-{{ index }}">Empresa</label>
        <input v-model="experience.company" id="company-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="starting-date-{{ index }}">Fecha de inicio</label>
        <input v-model="experience.startingDate" id="starting-date-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="finishing-date-{{ index }}">Fecha de finalización</label>
        <input v-model="experience.finishingDate" id="finishing-date-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="description-{{ index }}">Descripción</label>
        <input v-model="experience.description" id="description-{{ index }}" type="text" class="border">
      </div>
    </template>
  </div>
</template>
