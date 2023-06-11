<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')" type="button" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
    <slot></slot>
  </button>
</template>
