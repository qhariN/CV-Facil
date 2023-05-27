<script setup>
import ChevronRight from './icons/ChevronRight.vue'

defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li>
    <RouterLink :to="{ name: route }" class="group flex items-center gap-5 transition cursor-pointer bg-stone-100/10 hover:bg-stone-100/20 px-7 py-5">
      <div>
        <h2 class="font-bold text-base text-stone-600">{{ name }}</h2>
        <p class="text-stone-500">{{ description }}</p>
      </div>
      <button class="ms-auto p-3 rounded-full bg-stone-300/20 text-stone-400 group-hover:text-stone-500 transition duration-300">
        <ChevronRight class="w-6 h-6" />
      </button>
    </RouterLink>
  </li>
</template>
