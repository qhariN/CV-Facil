<script setup>
import ResumePreview from '../components/ResumePreview.vue'
import EducationForm from '../components/form/EducationForm.vue'
import PersonalInfoForm from '../components/form/PersonalInfoForm.vue'
import ProfessionalProfile from '../components/form/ProfessionalProfile.vue'
import WorkExperience from '../components/form/WorkExperience.vue'
</script>

<template>
  <div class="min-w-full min-h-screen flex">
    <div class="w-1/2 min-h-screen">
      <div class="w-full h-full bg-gray-50 flex flex-col justify-center items-center gap-12">
        <PersonalInfoForm />
        <ProfessionalProfile />
        <WorkExperience />
        <EducationForm />
      </div>
    </div>
    <ResumePreview />
  </div>
</template>
