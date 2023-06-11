<script setup>
defineProps({
  toRoute: String,
  toRouteName: String
})
</script>

<template>
  <RouterLink :to="toRoute?? { name: toRouteName }" class="text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
    <slot></slot>
  </RouterLink>
</template>
