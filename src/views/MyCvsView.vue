<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInfojobsStore } from '../stores/infojobs'
import { usePersonalInformationStore } from '../stores/personal-information'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import { useWorkExperienceStore } from '../stores/work-experience'
import { useEducationStore } from '../stores/education'

const route = useRoute()
const router = useRouter()
const infojobsStore = useInfojobsStore()
const personalInformationStore = usePersonalInformationStore()
const professionalProfileStore = useProfessionalProfileStore()
const workExperienceStore = useWorkExperienceStore()
const educationStore = useEducationStore()

const curriculums = ref([])

onMounted(() => {
  watch(() => route.query.access_token, value => {
    infojobsStore.verifyAccessToken(value, getCurriculums)
  }, { immediate: true })
})

async function getCurriculums () {
  const data = await infojobsStore.getCurriculums()
  curriculums.value = data
}

async function selectCurriculum (curriculum) {
  const curriculumId = curriculum.code
  const data = await Promise.all([
    infojobsStore.getPersonalData(curriculumId),
    infojobsStore.getCvText(curriculumId),
    infojobsStore.getExperience(curriculumId),
    infojobsStore.getEducation(curriculumId)
  ])
  const [personalData, cvText, experience, education] = data
  personalInformationStore.set(personalData)
  professionalProfileStore.set(cvText)
  workExperienceStore.set(experience)
  educationStore.set(education)
  router.push('wizard')
}
</script>

<template>
  <ul class="z-10 divide-y">
    <li v-for="(curriculum, index) in curriculums" :key="index" class="bg-gray-100/30 p-5" @click="selectCurriculum(curriculum)">
      <h2>{{ curriculum.name }}</h2>
      <span v-if="curriculum.principal">Principal</span>
    </li>
  </ul>
</template>
