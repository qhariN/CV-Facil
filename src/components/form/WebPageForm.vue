<script setup>
import { usePersonalInformationStore } from '../../stores/personal-information'
import BasicInput from '../BasicInput.vue'

const personalInformationStore = usePersonalInformationStore()
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tus páginas web
      </h2>
      <p class="font-bold text-base text-stone-400">
        Agrega enlaces a tus páginas web, como tu sitio web personal, tu perfil de LinkedIn o tu cuenta de Twitter.
      </p>
    </div>
    <div class="space-y-6">
      <template v-for="(webpage, index) in personalInformationStore.webpages" :key="index">
        <BasicInput v-model="webpage.url" id="webpage-{{ index }}" label="Enlace" placeholder="https://mi-sitio-web.com" />
      </template>
    </div>
    <div class="flex gap-4">
      <button @click="personalInformationStore.addWebpage" type="button" class="text-xl bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Añadir enlace
      </button>
      <RouterLink to="/wizard" class="ms-auto text-xl bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Volver
      </RouterLink>
      <RouterLink :to="{ name: 'professional-profile' }" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Siguiente
      </RouterLink>
    </div>
  </div>
</template>
