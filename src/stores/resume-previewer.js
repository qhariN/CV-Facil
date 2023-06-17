import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import debounce from '../utils/debounce'
import wretch from 'wretch'
import { renderPdf } from '../utils/pdfjs'
import { usePersonalInformationStore } from './personal-information'
import { useProfessionalProfileStore } from './professional-profile'
import { useWorkExperienceStore } from './work-experience'
import { useEducationStore } from './education'
import { useTechnicalSkillsStore } from './technical-skills'
import { useAditionalSkillsStore } from './aditional-skills'

export const useResumePreviewerStore = defineStore('resumePreviewer', () => {
  const dataUrl = ref(null)
  const totalPages = ref(1)
  const currentPage = ref(1)
  const isRendering = ref(true)

  const personalInformationStore = usePersonalInformationStore()
  const professionalProfileStore = useProfessionalProfileStore()
  const workExperienceStore = useWorkExperienceStore()
  const educationStore = useEducationStore()
  const technicalSkillsStore = useTechnicalSkillsStore()
  const aditionalSkillsStore = useAditionalSkillsStore()

  const debouncedRender = debounce(render, 1000)

  watch(currentPage, () => {
    render()
  })

  watch([
    personalInformationStore.$state,
    professionalProfileStore.$state,
    workExperienceStore.$state,
    educationStore.$state,
    technicalSkillsStore.$state,
    aditionalSkillsStore.$state
  ], () => {
    debouncedRender()
  })

  async function render () {
    isRendering.value = true

    const documentContent = [
      personalInformationStore.personalInformationSection,
      professionalProfileStore.professionalProfileSection,
      workExperienceStore.workExperienceSection,
      educationStore.educationSection,
      technicalSkillsStore.technicalSkillsSection,
      ...!aditionalSkillsStore.isEmpty ? [aditionalSkillsStore.aditionalSkillsSection] : []
    ]

    const request = wretch('/api/curriculum/render').post({ content: documentContent })
    dataUrl.value = await request.text()

    renderPdf(dataUrl.value, totalPages, currentPage, () => {
      isRendering.value = false
    })
  }

  function previousPage () {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  function nextPage () {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function download () {
    if (!dataUrl.value) return
    const link = document.createElement('a')
    link.download = 'CV.pdf'
    link.href = dataUrl.value
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return { render, totalPages, currentPage, isRendering, previousPage, nextPage, download }
})
