import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'
import debounce from '../utils/debounce'
import wretch from 'wretch'
import { usePersonalInformationStore } from './personal-information'
import { useProfessionalProfileStore } from './professional-profile'
import { useWorkExperienceStore } from './work-experience'
import { useEducationStore } from './education'
import { useTechnicalSkillsStore } from './technical-skills'
import { useAditionalSkillsStore } from './aditional-skills'

export const useResumePreviewerStore = defineStore('resumePreviewer', () => {
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL
  }

  console.log('PdfJs loaded')

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

    pdfjs.getDocument(dataUrl.value).promise.then(pdf => {
      totalPages.value = pdf.numPages

      const pageNumber = currentPage.value
      pdf.getPage(pageNumber).then(page => {
        console.log('Page loaded')

        let viewport = page.getViewport({ scale: 1 })
        const desiredWidth = 500
        const scale = desiredWidth / viewport.width
        viewport = page.getViewport({ scale })

        // Prepare canvas using PDF page dimensions
        const canvas = document.getElementById('the-canvas')
        const canvasContext = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext,
          viewport
        }
        const renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          isRendering.value = false
        })
      })
    }, reason => {
      // PDF loading error
      console.error(reason)
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
