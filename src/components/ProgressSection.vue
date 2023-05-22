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
  }
})
</script>

<template>
  <li class="px-7 py-6 flex items-center gap-5 cursor-pointer hover:bg-zinc-50">
    <div>
      <h2 class="font-bold text-base">{{ name }}</h2>
      <p>{{ description }}</p>
    </div>
    <button class="p-2 rounded-full bg-zinc-100 text-zinc-500">
      <ChevronRight class="w-6 h-6" />
    </button>
  </li>
</template>
