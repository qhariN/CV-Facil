<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useInfojobsStore } from '../stores/infojobs'
import { usePersonalInformationStore } from '../stores/personal-information'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import ChevronRight from '../components/icons/ChevronRight.vue'

const route = useRoute()
const infojobsStore = useInfojobsStore()
const personalInformationStore = usePersonalInformationStore()
const professionalProfileStore = useProfessionalProfileStore()

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

async function exportToCurriculum (curriculum) {
  hasSelectedCurriculum.value = true
  const curriculumId = curriculum.code

  const personalData = await infojobsStore.getPersonalData(curriculumId)

  const newPersonalData = {
    name: personalInformationStore.firstName || personalData.name,
    surname1: personalInformationStore.lastName.split(' ')[0] || personalData.surname1,
    surname2: personalInformationStore.lastName.split(' ')[1] || personalData.surname2,
    country: personalData.country,
    province: personalData.province,
    cityName: personalData.cityName,
    zipCode: personalData.zipCode,
    preferredContactPhone: 'foreign-phone',
    internationalPhone: personalInformationStore.phoneNumber || personalData.mobilePhone || personalData.internationalPhone,
    driverLicenses: personalData.driverLicenses || ['seleccionar'],
    nationalities: personalData.nationalities || ['espana'],
    birthDay: personalData.birthDay
  }
  const cvText = {
    cvtext: (professionalProfileStore.description || ' ').padEnd(109, ' ') + ' '
  }
  await Promise.all([
    infojobsStore.updatePersonalData(curriculumId, newPersonalData),
    infojobsStore.updateCvText(curriculumId, cvText)
  ]).catch(() => null)
  window.location.href = 'https://www.infojobs.net/candidate/cv/view/index.xhtml'
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
    <div v-else-if="!hasSelectedCurriculum" class="flex flex-col items-center gap-10">
      <h2 class="text-4xl font-bold text-center text-stone-700">
        Selecciona el currículum<br>
        destino
      </h2>
      <ul class="space-y-4 w-full">
        <li @click="exportToCurriculum(curriculum)" v-for="(curriculum, index) in curriculums" :key="index" class="group flex items-center gap-5 transition duration-300 cursor-pointer bg-stone-50/40 hover:bg-stone-50/50 rounded-2xl border border-stone-200 px-7 py-6 shadow-lg shadow-stone-400/10 hover:shadow-stone-400/30">
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
        Exportando datos al currículum
      </h2>
      <div class="race-by"></div>
    </div>
  </Transition>
</template>
