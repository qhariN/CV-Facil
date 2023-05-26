<script setup>
import { usePersonalInformationStore } from '../../stores/personal-information'

const personalInformationStore = usePersonalInformationStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col">
      <label for="fullName">Nombre completo</label>
      <input v-model="personalInformationStore.fullName" id="fullName" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="jobTitle">Puesto</label>
      <input v-model="personalInformationStore.jobTitle" id="jobTitle" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="address">Ubicación</label>
      <input v-model="personalInformationStore.address" id="address" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="phoneNumber">Número de teléfono</label>
      <input v-model="personalInformationStore.phoneNumber" id="phoneNumber" type="text" class="border">
    </div>
    <div class="flex flex-col">
      <label for="email">Correo electrónico</label>
      <input v-model="personalInformationStore.email" id="email" type="text" class="border">
    </div>
    <button @click="personalInformationStore.addWebpage">Añadir página web</button>
    <div v-for="(webpage, index) in personalInformationStore.webpages" :key="index" class="flex flex-col">
      <label for="webpage-{{ index }}">Páginas web</label>
      <input v-model="webpage.url" id="webpage-{{ index }}" type="text" class="border">
    </div>
  </div>
</template>
