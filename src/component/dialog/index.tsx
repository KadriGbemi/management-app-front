import { useState } from 'react'
import { Field, Fieldset, Input, Label } from '@headlessui/react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import EmployeesCombobox from '../inputs/employees/Combobox'
import {
  InfluencerFormProps,
  SOCIAL_MEDIA,
  SOCIAL_MEDIA_TYPE,
  SocialMediaAccountType,
} from '../../types/InfluencerType'
import { Employee } from '../../types/EmployeeType'

const DialogComponent = ({
  isOpen,
  setIsOpen,
  title = 'Create new influencer',
}: {
  isOpen: boolean
  setIsOpen: Function
  title?: string
}) => {
  const close = () => setIsOpen(false)

  const [formData, setFormData] = useState<InfluencerFormProps>({
    tiktok: [
      {
        plaform: 1,
        field: 'tiktok_1',
        username: '',
      },
    ],
    instagram: [
      {
        plaform: 2,
        field: 'instagram_1',
        username: '',
      },
    ],
  })

  const handleSocialMediaChange = ({
    value,
    index,
    type,
  }: {
    value?: string
    index: number
    type: SocialMediaAccountType
  }) => {
    const data = [...formData?.[type]]
    data[index].username = value

    setFormData({
      ...formData,
      [type]: data,
    })
  }

  const onPlusIconClicked = (type: SocialMediaAccountType) =>
    setFormData({
      ...formData,
      [type]: formData[type].concat({
        field: `${type}_${formData.tiktok?.length + 1}`,
        username: '',
        plaform: type === SOCIAL_MEDIA_TYPE.Tiktok ? SOCIAL_MEDIA.Tiktok : SOCIAL_MEDIA.Instagram,
      }),
    })

  const handleDelete = (field: string, type: SocialMediaAccountType) => {
    if (formData[type]?.length > 1) {
      const updatedSocialMediaData = formData[type].filter((item) => item.field !== field)

      setFormData({
        ...formData,
        [type]: updatedSocialMediaData,
      })
    }
  }

  const handleCreateInfluencer = () => {
    console.log('Form data', formData)
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-40 focus:outline-none' onClose={close}>
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

            <Fieldset className='space-y-6 pt-4'>
              <div className='rounded-xl bg-white/5 grid grid-cols-2 gap-4'>
                <Field>
                  <Label className='text-sm/6 font-medium text-secondary/80'>First name</Label>
                  <Input
                    placeholder='Enter first name'
                    value={formData?.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                    className='placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg border border-secondary/15 bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary/25'
                  />
                </Field>
                <Field>
                  <Label className='text-sm/6 font-medium text-secondary/80'>Last name</Label>
                  <Input
                    placeholder='Enter last name'
                    value={formData?.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                    className='placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg border border-secondary/15 bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary/25'
                  />
                </Field>
              </div>

              <div className='rounded-xl bg-white/5 space-y-4'>
                <Field className='space-y-2'>
                  <Label className='text-sm/6 font-medium text-secondary/80'>Tiktok</Label>
                  {formData?.tiktok?.map((item, index) => (
                    <div className='flex gap-1.5 items-center' key={index}>
                      <Input
                        placeholder='@username'
                        value={item.username}
                        onChange={(e) =>
                          handleSocialMediaChange({ value: e.target.value, index, type: SOCIAL_MEDIA_TYPE.Tiktok })
                        }
                        className='placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg border border-secondary/15 bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary/25'
                      />
                      <div className='flex'>
                        <PlusCircleIcon
                          className='w-6 h-6 cursor-pointer text-secondary/80'
                          onClick={() => onPlusIconClicked(SOCIAL_MEDIA_TYPE.Tiktok)}
                        />
                        <TrashIcon
                          className={`w-6 h-6 ${
                            index < 1 ? 'text-secondary/10 cursor-not-allowed' : 'text-red  cursor-pointer'
                          }`}
                          onClick={() => handleDelete(item.field, SOCIAL_MEDIA_TYPE.Tiktok)}
                        />
                      </div>
                    </div>
                  ))}
                </Field>

                <Field className='space-y-2'>
                  <Label className='text-sm/6 font-medium text-secondary/80'>Instagram</Label>
                  {formData?.instagram?.map((item, index) => (
                    <div className='flex gap-1.5 items-center' key={index}>
                      <Input
                        placeholder='@username'
                        value={item.username}
                        onChange={(e) =>
                          handleSocialMediaChange({ value: e.target.value, index, type: SOCIAL_MEDIA_TYPE.Instagram })
                        }
                        className='placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg border border-secondary/15 bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary/25'
                      />
                      <div className='flex'>
                        <PlusCircleIcon
                          className='w-6 h-6 cursor-pointer text-secondary/80'
                          onClick={() => onPlusIconClicked(SOCIAL_MEDIA_TYPE.Instagram)}
                        />
                        <TrashIcon
                          className={`w-6 h-6 ${
                            index < 1 ? 'text-secondary/10 cursor-not-allowed' : 'text-red  cursor-pointer'
                          }`}
                          onClick={() => handleDelete(item.field, SOCIAL_MEDIA_TYPE.Instagram)}
                        />
                      </div>
                    </div>
                  ))}
                </Field>
              </div>
              <Field className='space-y-2'>
                <Label className='text-sm/6 font-medium text-secondary/80'>Employee</Label>
                <EmployeesCombobox
                  anchor='top'
                  placeholder='Selected assigned manager'
                  handleOnChange={(value: Employee) =>
                    setFormData({
                      ...formData,
                      employee: value,
                    })
                  }
                />
              </Field>
            </Fieldset>

            <div className='mt-6 text-right'>
              <Button
                className='inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-secondary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary/65 data-[focus]:outline-1 data-[focus]:outline-white'
                onClick={handleCreateInfluencer}
              >
                Submit
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogComponent
