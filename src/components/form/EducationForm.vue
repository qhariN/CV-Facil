<script setup>
import { useEducationStore } from '../../stores/education'

const educationStore = useEducationStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="educationStore.addEducation">Añadir educación</button>
    <template v-for="(education, index) in educationStore.educations" :key="index">
      <div class="flex flex-col">
        <label for="title-{{ index }}">Título</label>
        <input v-model="education.title" id="title-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="institution-{{ index }}">Institución</label>
        <input v-model="education.institution" id="institution-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="starting-date-{{ index }}">Fecha de inicio</label>
        <input v-model="education.startingDate" id="starting-date-{{ index }}" type="text" class="border">
      </div>
      <div class="flex flex-col">
        <label for="finishing-date-{{ index }}">Fecha de finalización</label>
        <input v-model="education.finishingDate" id="finishing-date-{{ index }}" type="text" class="border">
      </div>
    </template>
  </div>
</template>
