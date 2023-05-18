'use client'
import FormHeader from '@/components/builder/form/form-header'
import Test from './test.mdx'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Builder() {
  const jspdf = () => {
    const dd = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]
    }
    pdfMake.createPdf(dd).open()
  }

  return (
    <>
      <div className="grow">
        <FormHeader />
        <div className='h-full overflow-y-auto'>
          <div className='min-h-full h-[2000px]'>
            form
            <button onClick={jspdf}>click</button>
          </div>
        </div>
      </div>
      <div className="grow">
        <div className='min-h-[300px] max-h-[300px] columns-[auto_140px] gap-3'>
          <div className='bg-white text-black break-inside-avoid'>
            <Test title='test prop' />
          </div>
        </div>
      </div>
    </>
  )
}