<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen flex justify-center items-center relative">
    <img src="@/assets/light-accent-compressed.png" alt="bg" class="absolute opacity-50 max-h-screen pointer-events-none -z-10">
    <RouterView />
  </main>
</template>
