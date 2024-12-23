import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import InfluencerForm from '../form/Influencer'
import { DialogType, Influencer } from '../../types/InfluencerType'

const DialogComponent = ({
  isOpen,
  setIsOpen,
  title = 'Create new influencer',
  handleDataRefresh,
  selectedInfluencer,
  type = 'create',
}: {
  isOpen: boolean
  setIsOpen: Function
  handleDataRefresh?: Function
  title?: string
  selectedInfluencer?: Influencer
  type?: DialogType
}) => {
  const closeDialog = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} as='div' className='relative z-40 focus:outline-none' onClose={closeDialog}>
      <div className='fixed inset-0 z-30 w-screen bg-secondary/50'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-h-scree max-w-md rounded-xl bg-white p-6  overflow-y-auto 
            backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] 
            data-[closed]:opacity-0'
          >
            <DialogTitle as='h3' className='text-lg text-center font-medium text-secondary'>
              {title}
            </DialogTitle>

            <InfluencerForm
              type={type}
              handleDataRefresh={handleDataRefresh}
              closeDialog={closeDialog}
              selectedInfluencer={selectedInfluencer}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogComponent
