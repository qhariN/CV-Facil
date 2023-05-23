<script setup>
import ResumePreview from '../components/ResumePreview.vue'
import PersonalInfoForm from '../components/form/PersonalInfoForm.vue'
</script>

<template>
  <div class="min-w-full min-h-screen flex">
    <div class="w-1/2 min-h-screen">
      <div class="w-full h-full bg-gray-50 flex justify-center items-center">
        <PersonalInfoForm />
      </div>
    </div>
    <ResumePreview />
  </div>
</template>
