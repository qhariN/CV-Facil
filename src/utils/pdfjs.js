import * as pdfjs from 'pdfjs-dist/legacy/build/pdf'

if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL
}
console.log('PdfJs loaded')

export function renderPdf (dataUrl, totalPages, currentPage, onRender) {
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
      renderTask.promise.then(onRender)
    })
  }, reason => {
    // PDF loading error
    console.error(reason)
  })
}
