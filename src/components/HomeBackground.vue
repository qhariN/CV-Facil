<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-gray-100 flex justify-center items-center relative">
    <img src="@/assets/light-accent-compressed.png" alt="bg" class="absolute opacity-50 max-h-screen">
    <RouterView />
  </main>
</template>
