<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  rows: {
    type: Number,
    default: 4
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full text-lg bg-stone-200/40 outline-stone-500 rounded-2xl px-6 pt-8 pb-3 transition-colors resize-none"
    ></textarea>
    <label :for="id" class="absolute text-lg text-stone-500 top-0 left-0 pointer-events-none transition-transform origin-top-left translate-x-6 translate-y-[22px] scale-100">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
  textarea::placeholder {
    @apply text-transparent;
    @apply transition-colors;
  }
  textarea:focus::placeholder,
  textarea:valid::placeholder {
    @apply text-stone-400;
  }
  textarea:hover {
    @apply bg-stone-200/60;
  }
  textarea:focus {
    @apply bg-stone-200/60;
  }
  textarea:focus ~ label {
    @apply text-stone-600;
    @apply translate-y-3 scale-75;
  }
  textarea:valid ~ label {
    @apply translate-y-3 scale-75;
  }
</style>
