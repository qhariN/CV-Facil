<script setup>
const emits = defineEmits(['click'])
</script>

<template>
  <button @click="emits('click')" type="button" class="w-12 h-12 bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20 flex justify-center items-center disabled:text-stone-300 disabled:cursor-not-allowed">
    <slot></slot>
  </button>
</template>
