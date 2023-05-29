<script setup>
import { onMounted, ref, watch } from 'vue'
import ResumePreview from '../components/ResumePreview.vue'
import ConfettiGenerator from 'confetti-js'
import { usePersonalInformationStore } from '../stores/personal-information'
import { useProfessionalProfileStore } from '../stores/professional-profile'
import { useWorkExperienceStore } from '../stores/work-experience'
import { useEducationStore } from '../stores/education'
import { useTechnicalSkillsStore } from '../stores/technical-skills'

const showConfetti = ref(false)
const personalInformationStore = usePersonalInformationStore()
const professionalProfileStore = useProfessionalProfileStore()
const workExperienceStore = useWorkExperienceStore()
const educationStore = useEducationStore()
const technicalSkillsStore = useTechnicalSkillsStore()

onMounted(() => {
  const width = window.innerWidth
  const confettiSettings = { target: 'confetti-holder', max: 20, animate: ['square'], clock: 15, width: width / 2 }
  const confetti = new ConfettiGenerator(confettiSettings)
  confetti.render()

  watch([
    () => personalInformationStore.completed,
    () => personalInformationStore.completedwebpages,
    () => professionalProfileStore.completed,
    () => workExperienceStore.completed,
    () => educationStore.completed,
    () => technicalSkillsStore.completed
  ],
  (completed) => {
    showConfetti.value = completed.every(Boolean)
  }, { immediate: true })
})

</script>

<template>
  <div class="min-w-full min-h-screen max-h-screen flex relative">
    <div class="absolute w-1/2 h-full bg-stone-50"></div>
    <Transition name="fade">
      <canvas v-show="showConfetti" id="confetti-holder" class="absolute inset-0"></canvas>
    </Transition>
    <div class="w-1/2 min-h-screen shadow-xl shadow-stone-400/30 overflow-y-auto sticky">
      <div class="w-full min-h-full flex justify-end items-center px-12 2xl:px-20 py-16">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
    <ResumePreview />
  </div>
</template>
