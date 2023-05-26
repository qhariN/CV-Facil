import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { hr, setupStyles } from '../utils/pdf-build'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '../utils/pdf-fonts'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'
import debounce from '../utils/debounce'
import { usePersonalInformationStore } from './personal-information'
import { useProfessionalProfileStore } from './professional-profile'
import { useWorkExperienceStore } from './work-experience'
import { useEducationStore } from './education'

export const useResumePreviewerStore = defineStore('resumePreviewer', () => {
  pdfMake.fonts = pdfFonts

  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL
  }

  console.log('PdfMake and PdfJs loaded')

  const instance = ref(null)
  const totalPages = ref(1)
  const currentPage = ref(1)

  const personalInformationStore = usePersonalInformationStore()
  const professionalProfileStore = useProfessionalProfileStore()
  const workExperienceStore = useWorkExperienceStore()
  const educationStore = useEducationStore()

  const render = debounce(() => {
    const documentDefinitions = {
      pageMargins: [40, 60, 40, 60],
      content: [
        personalInformationStore.personalInformationSection,
        hr(),
        professionalProfileStore.professionalProfileSection,
        hr(),
        workExperienceStore.workExperienceSection,
        hr(),
        educationStore.educationSection,
        hr(),
        {
          columns: [
            {
              width: 120,
              text: 'Habilidades técnicas',
              style: 'sectionTitle'
            },
            {
              width: '*',
              columns: [[
                {
                  text: 'Lenguajes y tecnologías',
                  style: 'subSectionTitle'
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                },
                {
                  text: 'Tecnologías front-end',
                  style: ['subSectionTitle', 'mt10']
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                },
                {
                  text: 'Tecnologías back-end',
                  style: ['subSectionTitle', 'mt10']
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                },
                {
                  text: 'Databases',
                  style: ['subSectionTitle', 'mt10']
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                },
                {
                  text: 'Tecnologías CI/CD',
                  style: ['subSectionTitle', 'mt10']
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                },
                {
                  text: 'Conceptos',
                  style: ['subSectionTitle', 'mt10']
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                }
              ]]
            }
          ]
        },
        hr(),
        {
          columns: [
            {
              width: 120,
              text: 'Información adicional',
              style: 'sectionTitle'
            },
            {
              width: '*',
              columns: [[
                {
                  text: 'Idiomas',
                  style: 'subSectionTitle'
                },
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
                  style: 'gray'
                }
              ]]
            }
          ]
        }
      ],
      ...setupStyles()
    }
    instance.value = pdfMake.createPdf(documentDefinitions)
    instance.value.getDataUrl(dataUrl => {
      pdfjs.getDocument(dataUrl).promise.then(pdf => {
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
            console.log('Page rendered')
          })
        })
      }, reason => {
        // PDF loading error
        console.error(reason)
      })
    })
  }, 1000)

  watch([
    currentPage,
    personalInformationStore.$state,
    professionalProfileStore.$state,
    workExperienceStore.$state,
    educationStore.$state
  ], () => render(), { immediate: true })

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
    instance.value.open()
    // instance.value.download('John Doe - CV')
  }

  return { totalPages, currentPage, previousPage, nextPage, download }
})
