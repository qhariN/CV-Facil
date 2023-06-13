<script setup>
import { useInfojobsStore } from '../stores/infojobs'
import GithubLogo from '../components/icons/GithubLogo.vue'
import PrimaryRouterButton from '../components/PrimaryRouterButton.vue'
import SecondaryButton from '../components/SecondaryButton.vue'

const infojobsStore = useInfojobsStore()
</script>

<template>
  <div class="max-w-screen-md text-center">
    <h1 class="text-8xl text-transparent bg-clip-text bg-gradient-to-t from-stone-700 to-black/90">CV Fácil</h1>
    <p class="text-xl mt-5">
      ¡Crea tu currículum profesional en minutos!<br>
      Obtén un PDF listo para conquistar tu próxima oportunidad laboral
    </p>
    <div class="mt-9 flex justify-center items-center gap-3">
      <PrimaryRouterButton to-route="/wizard">
        Comenzar
      </PrimaryRouterButton>
      <p class="text-xl">ó</p>
      <SecondaryButton @click="infojobsStore.login('import')" class="group">
        <span class="group-hover:bg-clip-text group-hover:text-transparent bg-gradient-to-r group-hover:from-[#23536E] group-hover:to-[#167DB7]">Importar de InfoJobs</span>
      </SecondaryButton>
    </div>
  </div>
  <div class="absolute bottom-0 right-0 px-12 py-8">
    <a href="https://github.com/jhormanrus/CV-Facil" class="text-stone-700/80 hover:text-stone-700 flex items-center gap-2">
      <GithubLogo class="w-6 h-6" />
      Ver código
    </a>
  </div>
</template>
