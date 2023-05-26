<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInfojobsStore } from '../stores/infojobs'
import { usePersonalInformationStore } from '../stores/personal-information'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import { useWorkExperienceStore } from '../stores/work-experience'
import { useEducationStore } from '../stores/education'
import ChevronRight from '../components/icons/ChevronRight.vue'

const route = useRoute()
const router = useRouter()
const infojobsStore = useInfojobsStore()
const personalInformationStore = usePersonalInformationStore()
const professionalProfileStore = useProfessionalProfileStore()
const workExperienceStore = useWorkExperienceStore()
const educationStore = useEducationStore()

const curriculums = ref([])
const hasSelectedCurriculum = ref(false)

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
  hasSelectedCurriculum.value = true
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
  <Transition name="fade" mode="out-in">
    <div v-if="!curriculums.length" class="flex flex-col items-center gap-3">
      <h2 class="text-xl font-bold text-center text-stone-700">
        Cargando currículums
      </h2>
      <div class="race-by"></div>
    </div>
    <div v-else-if="!hasSelectedCurriculum" class="flex flex-col items-center gap-8 w-80">
      <h2 class="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-t from-stone-800 to-black/80">
        Selecciona un<br>
        currículum
      </h2>
      <ul class="z-10 space-y-4 w-full">
        <li @click="selectCurriculum(curriculum)" v-for="(curriculum, index) in curriculums" :key="index" class="group flex items-center gap-5 transition cursor-pointer bg-gray-100/10 hover:bg-gray-100/20 backdrop-blur-sm rounded-2xl border border-stone-300 px-7 py-6 shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
          <div>
            <h2 class="font-bold text-xl text-stone-600">{{ curriculum.name }}</h2>
            <span v-if="curriculum.principal" class="text-lg text-stone-400">Principal</span>
            <span v-else class="text-lg text-stone-400">Secundario</span>
          </div>
          <button class="ms-auto p-3 rounded-full bg-stone-300/20 text-stone-400 group-hover:text-stone-500 transition duration-300">
            <ChevronRight class="w-6 h-6" />
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col items-center gap-3">
      <h2 class="text-xl font-bold text-center text-stone-700">
        Cargando datos del currículum
      </h2>
      <div class="race-by"></div>
    </div>
  </Transition>
</template>
