<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
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
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full text-lg bg-stone-200/40 outline-stone-500 rounded-2xl px-6 pt-8 pb-3 transition-colors"
    />
    <label :for="id" class="absolute text-lg text-stone-500 top-0 left-0 pointer-events-none transition-transform origin-top-left translate-x-6 translate-y-[22px] scale-100">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
  input::placeholder {
    @apply text-transparent;
    @apply transition-colors;
  }
  input:focus::placeholder,
  input:valid::placeholder {
    @apply text-stone-400;
  }
  input:hover {
    @apply bg-stone-200/60;
  }
  input:focus {
    @apply bg-stone-200/60;
  }
  input:focus ~ label {
    @apply text-stone-600;
    @apply translate-y-3 scale-75;
  }
  input:valid ~ label {
    @apply translate-y-3 scale-75;
  }
</style>
