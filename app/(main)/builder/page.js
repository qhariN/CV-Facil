import FormHeader from '@/components/builder/form/form-header'

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
        preview
      </div>
    </>
  )
}