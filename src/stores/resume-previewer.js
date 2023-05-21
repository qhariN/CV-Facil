import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
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

  const documentContent = ref('')

  function render() {
    const hr = {
      table : {
        widths: ['100%'],
        body : [[''], ['']]
      },
      layout : {
        hLineWidth(i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0
          }
          return 1
        },
        vLineWidth() {
          return 0
        },
        hLineColor() {
          return '#eee'
        },
      },
      margin: [0, 24, 0, 24],
    }
    const documentDefinitions = {
      pageMargins: [ 40, 60, 40, 60 ],
      content: [
        {
          columns: [
            {
              width: '*',
              columns: [[
                {
                  text: 'John Doe',
                  style: 'fullName',
                },
                {
                  text: 'Service Designer',
                  style: 'jobTitle',
                }
              ]]
            },
            {
              width: 'auto',
              columns: [[
                {
                  text: 'United States',
                },
                {
                  text: '(123) 456-7890',
                },
                {
                  text: 'john@doe.com',
                },
                ' ',
                {
                  text: 'https://linkedin.com/in/john-doe',
                  link: 'https://linkedin.com/in/john-doe',
                },
                {
                  text: 'https://github.com/john-doe',
                  link: 'https://github.com/john-doe',
                },
                {
                  text: 'https://john-doe.com',
                  link: 'https://john-doe.com',
                },
              ]],
              style: 'gray',
            }
          ]
        },
        hr,
        {
          columns: [
            {
              width: 140,
              text: 'Perfil profesional',
              style: 'sectionTitle',
            },
            {
              width: '*',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna',
              style: 'gray',
            }
          ]
        },
        hr,
        {
          columns: [
            {
              width: 140,
              text: 'Experiencia laboral',
              style: 'sectionTitle',
            },
            {
              width: '*',
              columns: [[
                {
                  text: 'Senior Service Designer',
                  style: 'subSectionTitle',
                },
                {
                  text: 'at ACME Inc.',
                  style: 'subSectionTitle',
                },
                {
                  text: 'Sep 2016 - Current',
                  style: 'italic',
                },
                {
                  text: 'New York, NY',
                  style: 'italic',
                },
                {
                  text: 'My current employment. Responsible for the bounciness of the balls, the quality of the anvils, and the dynamism of the explosions.',
                  style: ['gray', 'mt6'],
                },
              ]]
            }
          ]
        },
      ],
      styles: {
        italic: {
          font: 'Merriweather',
          lineHeight: 1,
          italics: true
        },
        gray: {
          color: 'gray'
        },
        fullName: {
          font: 'Merriweather',
          lineHeight: 1,
          fontSize: 24,
          bold: true
        },
        jobTitle: {
          font: 'Merriweather',
          lineHeight: 1,
          fontSize: 18,
          color: 'gray'
        },
        sectionTitle: {
          font: 'Merriweather',
          lineHeight: 1,
          fontSize: 16,
          bold: true
        },
        subSectionTitle: {
          font: 'Merriweather',
          lineHeight: 1,
          fontSize: 14,
          bold: true
        },
        mt6: {
          marginTop: 6
        }
      },
      defaultStyle: {
        font: 'NotoSerif',
        fontSize: 12,
        lineHeight: 0.8
      }
    }
    pdfMake.createPdf(documentDefinitions).getDataUrl(dataUrl => {
      pdfjs.getDocument(dataUrl).promise.then(pdf => {
        const pageNumber = 1
        pdf.getPage(pageNumber).then(page => {
          console.log('Page loaded')
          
          let viewport = page.getViewport({ scale: 1 })
          const desiredWidth = 500
          const scale = desiredWidth / viewport.width
          viewport = page.getViewport({ scale })
      
          // Prepare canvas using PDF page dimensions
          const canvas = document.getElementById('the-canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
      
          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          var renderTask = page.render(renderContext)
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

  watch(documentContent, () => {
    render()
  })

  return { documentContent, render }
})
