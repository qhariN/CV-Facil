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
    <RouterLink :to="{ name: route }" class="group flex items-center gap-5 transition cursor-pointer bg-white/50 hover:bg-white px-7 py-5 outline-none">
      <div>
        <h2 class="font-bold text-base text-stone-600">{{ name }}</h2>
        <p class="text-stone-500">{{ description }}</p>
      </div>
      <button class="ms-auto p-3 rounded-full bg-stone-100/70 text-stone-400/80 group-hover:text-stone-500 transition duration-300 outline-none">
        <ChevronRight class="w-6 h-6" />
      </button>
    </RouterLink>
  </li>
</template>
