<script setup>
defineProps({
  toRoute: String,
  toRouteName: String
})
</script>

<template>
  <RouterLink :to="toRoute?? { name: toRouteName }" class="ms-auto text-xl bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
    <slot></slot>
  </RouterLink>
</template>
