<script setup>
import { useResumePreviewerStore } from '../../stores/resume-previewer'

const resumePreviewer = useResumePreviewerStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col">
      <label for="fullName">Nombre completo</label>
      <input v-model="resumePreviewer.fullName" id="fullName" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="jobTitle">Puesto</label>
      <input v-model="resumePreviewer.jobTitle" id="jobTitle" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="address">Ubicación</label>
      <input v-model="resumePreviewer.address" id="address" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="phoneNumber">Número de teléfono</label>
      <input v-model="resumePreviewer.phoneNumber" id="phoneNumber" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="email">Correo electrónico</label>
      <input v-model="resumePreviewer.email" id="email" type="text" class="border">
    </div>
  </div>
</template>
