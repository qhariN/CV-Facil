<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  rows: {
    type: Number,
    required: false,
    default: 4
  },
  size: {
    type: String,
    required: false,
    default: 'lg'
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
    required: false,
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-field" :class="{ sm: size === 'sm', lg: size === 'lg' }">
    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped>
  .input-field {
    @apply relative;
  }
  .input-field > textarea {
    @apply w-full;
    @apply bg-stone-200/40;
    @apply outline-stone-500;
    @apply rounded-2xl;
    @apply px-3 pt-6 pb-2;
    @apply transition-colors;
    @apply resize-none;
  }
  .input-field > textarea::placeholder {
    @apply text-transparent;
    @apply transition-colors;
  }
  .input-field > textarea:focus::placeholder,
  .input-field > textarea:valid::placeholder {
    @apply text-stone-400;
  }
  .input-field > textarea:hover {
    @apply bg-stone-200/60;
  }
  .input-field > textarea:focus {
    @apply bg-stone-200/60;
  }

  .input-field > label {
    @apply absolute;
    @apply text-stone-500;
    @apply top-0 left-0;
    @apply transition-transform;
    @apply pointer-events-none;
    @apply origin-top-left;
    @apply translate-x-3 translate-y-4 scale-100;
  }
  .input-field > textarea:focus ~ label {
    @apply text-stone-600;
    @apply translate-y-2 scale-75;
  }
  .input-field > textarea:valid ~ label {
    @apply translate-y-2 scale-75;
  }

  .input-field.sm > textarea {
    @apply pt-5 pb-1;
  }
  .input-field.sm > label {
    @apply translate-y-3 scale-100;
  }
  .input-field.sm > textarea:focus ~ label,
  .input-field.sm > textarea:valid ~ label {
    @apply translate-y-1 scale-75;
  }

  .input-field.lg > textarea {
    @apply text-lg;
    @apply px-6 pt-8 pb-3;
  }
  .input-field.lg > label {
    @apply text-lg;
    @apply translate-x-6 translate-y-[22px] scale-100;
  }
  .input-field.lg > textarea:focus ~ label,
  .input-field.lg > textarea:valid ~ label {
    @apply translate-y-3 scale-75;
  }
</style>
