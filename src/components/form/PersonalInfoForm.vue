<script setup>
import { usePersonalInformationStore } from '../../stores/personal-information'
import BasicInput from '../BasicInput.vue'
import RouterButton from '../RouterButton.vue'

const personalInformationStore = usePersonalInformationStore()
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tu información personal
      </h2>
      <p class="font-bold text-base text-stone-400">
        Completa tu información personal para facilitar el contacto de los reclutadores. Tus datos solo se guardarán localmente en el navegador.
      </p>
    </div>
    <div class="space-y-6">
      <div class="flex gap-6">
        <BasicInput v-model="personalInformationStore.firstName" id="firstName" label="Nombres" placeholder="John" class="grow" />
        <BasicInput v-model="personalInformationStore.lastName" id="lastName" label="Apellidos" placeholder="Doe" class="grow" />
      </div>
      <BasicInput v-model="personalInformationStore.jobTitle" id="jobTitle" label="Puesto" placeholder="Desarrollador web" />
      <div class="flex gap-6">
        <BasicInput v-model="personalInformationStore.address" id="address" label="Ubicación" placeholder="Ciudad de México, MX" class="grow" />
        <BasicInput v-model="personalInformationStore.phoneNumber" id="phoneNumber" label="Número de teléfono" placeholder="+52 1 55 5555 5555" class="grow" />
      </div>
      <BasicInput v-model="personalInformationStore.email" id="email" label="Correo electrónico" placeholder="john.doe@ejemplo.com" />
    </div>
    <div class="flex gap-4">
      <SecondaryRouterButton to="/wizard" class="ms-auto">
        Volver
      </SecondaryRouterButton>
      <RouterButton to-route-name="web-page">Siguiente</RouterButton>
    </div>
  </div>
</template>
