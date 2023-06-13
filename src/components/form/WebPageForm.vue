<script setup>
import { usePersonalInformationStore } from '../../stores/personal-information'
import BasicInput from '../BasicInput.vue'
import RouterButton from '../RouterButton.vue'
import SecondaryButton from '../SecondaryButton.vue'
import SimpleTrash from '../icons/SimpleTrash.vue'

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
      <div v-for="(webpage, index) in personalInformationStore.webpages" :key="index" class="flex items-center gap-4">
        <button v-if="personalInformationStore.webpages.length > 1" @click="personalInformationStore.removeWebpage(index)" type="button" class="w-12 h-12 bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20 flex justify-center items-center">
          <SimpleTrash class="w-5 h-5" />
        </button>
        <BasicInput v-model="webpage.url" id="webpage-{{ index }}" label="Enlace" placeholder="https://mi-sitio-web.com" class="grow" />
      </div>
    </div>
    <div class="flex gap-4">
      <SecondaryButton @click="personalInformationStore.addWebpage">
        Añadir enlace
      </SecondaryButton>
      <SecondaryRouterButton to="/wizard" class="ms-auto">
        Volver
      </SecondaryRouterButton>
      <RouterButton to-route-name="professional-profile">Siguiente</RouterButton>
    </div>
  </div>
</template>
