import { allowCors } from '../../src/middlewares/cors'
import { hr, setupStyles } from '../../src/utils/pdf-build'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '../../src/utils/pdf-fonts'
pdfMake.fonts = pdfFonts

global.XMLHttpRequest = require('xhr2')

function handler (req, res) {
  const { content } = req.body

  const documentDefinitions = {
    pageMargins: [40, 60, 40, 60],
    content: content.flatMap((section, index) => {
      if (index === content.length - 1) {
        return [section]
      } else {
        return [section, hr()]
      }
    }),
    ...setupStyles()
  }
  pdfMake.createPdf(documentDefinitions).getDataUrl(dataUrl => {
    return res.send(dataUrl)
  })
}

export default allowCors(handler)
