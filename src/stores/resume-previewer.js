import { ref } from 'vue'
import { defineStore } from 'pinia'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'

export const useResumePreviewerStore = defineStore('resumePreviewer', () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL
  }

  const documentContent = ref([])

  function render() {
    const documentDefinitions = {
      content: documentContent.value
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

  return { documentContent, render }
})
