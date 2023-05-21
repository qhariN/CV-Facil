import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { hr, setupStyles } from '../utils/pdf-build'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'

export const useResumePreviewerStore = defineStore('resumePreviewer', () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs
  pdfMake.fonts = {
    Merriweather: {
      normal: 'https://fonts.cdnfonts.com/s/12231/Merriweather-Regular.woff',
      bold: 'https://fonts.cdnfonts.com/s/12231/Merriweather-Bold.woff',
      italics: 'https://fonts.cdnfonts.com/s/12231/Merriweather-Italic.woff',
      bolditalics: 'https://fonts.cdnfonts.com/s/12231/Merriweather-BoldItalic.woff'
    },
    NotoSerif: {
      normal: 'https://fonts.cdnfonts.com/s/15898/HindSiliguri-Regular.woff',
      bold: 'https://fonts.cdnfonts.com/s/15898/HindSiliguri-Bold.woff'
    }
  }

  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL
  }

  console.log('PdfMake and PdfJs loaded')

  const instance = ref(null)
  const documentContent = ref('')
  const totalPages = ref(1)
  const currentPage = ref(1)

  watch([documentContent, currentPage], () => {
    render()
  })

  function render () {
    const documentDefinitions = {
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          columns: [
            {
              width: '*',
              columns: [[
                {
                  text: 'John Doe',
                  style: 'fullName'
                },
                {
                  text: 'Service Designer',
                  style: 'jobTitle'
                }
              ]]
            },
            {
              width: 'auto',
              columns: [[
                {
                  text: 'United States'
                },
                {
                  text: '(123) 456-7890'
                },
                {
                  text: 'john@doe.com'
                },
                ' ',
                {
                  text: 'https://linkedin.com/in/john-doe',
                  link: 'https://linkedin.com/in/john-doe'
                },
                {
                  text: 'https://github.com/john-doe',
                  link: 'https://github.com/john-doe'
                },
                {
                  text: 'https://john-doe.com',
                  link: 'https://john-doe.com'
                }
              ]],
              style: 'gray'
            }
          ]
        },
        hr(),
        {
          columns: [
            {
              width: 120,
              text: 'Perfil profesional',
              style: 'sectionTitle'
            },
            {
              width: '*',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
              style: 'gray'
            }
          ]
        },
        hr(),
        {
          columns: [
            {
              width: 120,
              text: 'Experiencia laboral',
              style: 'sectionTitle'
            },
            {
              width: '*',
              columns: [[
                {
                  text: 'Senior Service Designer',
                  style: 'subSectionTitle'
                },
                {
                  text: 'at ACME Inc.',
                  style: 'subSectionTitle'
                },
                {
                  text: 'Sep 2016 - Current',
                  style: 'italic'
                },
                {
                  text: 'New York, NY',
                  style: 'italic'
                },
                {
                  text: 'My current employment. Responsible for the bounciness of the balls, the quality of the anvils, and the dynamism of the explosions.',
                  style: ['gray', 'mt6']
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
              text: 'Educación',
              style: 'sectionTitle'
            },
            {
              width: '*',
              columns: [[
                {
                  text: 'Bachelor of Science',
                  style: 'subSectionTitle'
                },
                {
                  text: 'at University of Nowhere',
                  style: 'subSectionTitle'
                },
                {
                  text: '2008 - 2012',
                  style: 'italic'
                },
                {
                  text: 'New York, NY',
                  style: 'italic'
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
    instance.value.open()
    // instance.value.download('John Doe - CV')
  }

  return { documentContent, totalPages, currentPage, render, previousPage, nextPage, download }
})
