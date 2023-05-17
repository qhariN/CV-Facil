import FormHeader from '@/components/builder/form/form-header'
import Test from './test.mdx'

export default function Builder() {
  return (
    <>
      <div className="grow">
        <FormHeader />
        <div className='h-full overflow-y-auto'>
          <div className='min-h-full h-[2000px]'>
            form
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