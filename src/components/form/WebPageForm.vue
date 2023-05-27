<script setup>
import { usePersonalInformationStore } from '../../stores/personal-information'

const personalInformationStore = usePersonalInformationStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <button @click="personalInformationStore.addWebpage">Añadir página web</button>
    <div v-for="(webpage, index) in personalInformationStore.webpages" :key="index" class="flex flex-col">
      <label for="webpage-{{ index }}">Páginas web</label>
      <input v-model="webpage.url" id="webpage-{{ index }}" type="text" class="border">
    </div>
  </div>
</template>
