<script setup>
import { useProfessionalProfileStore } from '../../stores/professional-profile'

const professionalProfileStore = useProfessionalProfileStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col">
      <label for="description">Descripción</label>
      <input v-model="professionalProfileStore.description" id="description" type="text" class="border">
    </div>
  </div>
</template>
