import { useCallback, useEffect, useState } from 'react'
import { Field, Fieldset, Input, Label } from '@headlessui/react'
import { Button } from '@headlessui/react'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import EmployeesCombobox from '../inputs/employees/Combobox'
import { Influencer, SOCIAL_MEDIA, SOCIAL_MEDIA_TYPE, SocialMediaAccountType } from '../../types/InfluencerType'
import { Employee } from '../../types/EmployeeType'
import { apiRequest } from '../../api'
import { useNotification } from '../../context/Notification'

const InfluencerForm = ({
  type,
  handleDataRefresh,
  closeDialog,
  selectedInfluencer,
}: {
  type?: 'edit' | 'create'
  selectedInfluencer?: Influencer
  handleDataRefresh?: Function
  closeDialog?: Function
}) => {
  const { setError, setSuccess } = useNotification()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isDisabled = type === 'edit'

  const [formData, setFormData] = useState<Influencer>({
    tiktok: [
      {
        plaform: SOCIAL_MEDIA.Tiktok,
        field: 'tiktok_1',
        username: '',
      },
    ],
    instagram: [
      {
        plaform: SOCIAL_MEDIA.Instagram,
        field: 'instagram_1',
        username: '',
      },
    ],
  })

  const handleDataPreload = useCallback(() => {
    if (type === 'edit' && selectedInfluencer) {
      setFormData({ ...selectedInfluencer })
    }
  }, [selectedInfluencer, type])

  useEffect(() => {
    if (type === 'edit') {
      handleDataPreload()
    }
  }, [handleDataPreload, type])

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

  const handleCreateInfluencer = async () => {
    const employee = formData.employee
    setIsSubmitting(true)

    if (type === 'create') {
      const response = await apiRequest('/influencers', 'POST', {
        ...formData,
        employee: { img: employee?.img, id: employee?.id, name: employee?.name },
      })

      if (response?.errors) {
        setErrors(response.errors)
      }
      if (response?.error) {
        setError?.(response.error)
      }

      if (response?.data) {
        setSuccess?.('Influencer created successfully')
        handleDataRefresh?.()
        closeDialog?.()
      }
      setIsSubmitting(false)
    }

    if (type === 'edit') {
      const response = await apiRequest('/influencers', 'PUT', {
        influencerId: formData.id,
        employee: { img: employee?.img, id: employee?.id, name: employee?.name },
      })

      if (response?.errors) {
        setErrors(response.errors)
      }
      if (response?.error) {
        setError?.(response.error)
      }

      if (response?.data) {
        setSuccess?.('Influencer updated successfully')
        handleDataRefresh?.()
        closeDialog?.()
      }
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Fieldset className='space-y-6 pt-4'>
        <div className='rounded-xl bg-white/5 grid grid-cols-2 gap-4'>
          <Field>
            <Label className='text-sm/6 font-medium text-secondary/80'>First name</Label>
            <Input
              disabled={isDisabled}
              placeholder='Enter first name'
              value={formData?.first_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  first_name: e.target.value,
                })
              }
              className={`disabled:bg-tetiary/15 disabled:text-secondary/15 disabled:border-tetiary/5 disabled:shadow-none placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg border bg-white/5
                     py-1.5 px-3 text-sm/6 text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2
                     ${errors?.first_name ? ' border-red' : '  border-secondary/15 data-[focus]:outline-secondary/25'}`}
            />
            {errors?.first_name && <div className='font-normal text-red text-xs pt-1'>{errors.first_name}</div>}
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-secondary/80'>Last name</Label>
            <Input
              disabled={isDisabled}
              placeholder='Enter last name'
              value={formData?.last_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  last_name: e.target.value,
                })
              }
              className={`disabled:bg-tetiary/15 disabled:text-secondary/15 disabled:border-tetiary/5 disabled:shadow-none placeholder:italic placeholder:text-secondary/40 block w-full 
                    rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 
                    text-secondary focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2
                      ${errors?.last_name ? ' border-red' : 'border-secondary/15 data-[focus]:outline-secondary/25'}`}
            />
            {errors?.last_name && <div className='font-normal text-red text-xs pt-1'>{errors.last_name}</div>}
          </Field>
        </div>

        <div className='rounded-xl bg-white/5 space-y-4'>
          <Field className='space-y-2'>
            <Label className='text-sm/6 font-medium text-secondary/80'>Tiktok</Label>
            {formData?.tiktok?.map((item, index) => (
              <div key={index}>
                <div className='flex gap-1.5 items-center'>
                  <Input
                    placeholder='Enter username'
                    disabled={isDisabled}
                    value={item.username}
                    onChange={(e) =>
                      handleSocialMediaChange({ value: e.target.value, index, type: SOCIAL_MEDIA_TYPE.Tiktok })
                    }
                    className={`disabled:bg-tetiary/15 disabled:text-secondary/15 disabled:border-tetiary/5 disabled:shadow-none placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg 
                        border bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none 
                        data-[focus]:outline-2 data-[focus]:-outline-offset-2
                        ${
                          errors?.[`tiktok_${index + 1}`]
                            ? ' border-red'
                            : '  border-secondary/15 data-[focus]:outline-secondary/25'
                        }`}
                  />
                  <div className='flex'>
                    <PlusCircleIcon
                      className={`w-6 h-6 ${
                        isDisabled ? 'text-secondary/10 cursor-not-allowed' : ' text-secondary/80 cursor-pointer'
                      }`}
                      onClick={() => !isDisabled && onPlusIconClicked(SOCIAL_MEDIA_TYPE.Tiktok)}
                    />
                    <TrashIcon
                      className={`w-6 h-6 ${
                        isDisabled || index < 1 ? 'text-secondary/10 cursor-not-allowed' : 'text-red cursor-pointer'
                      }`}
                      onClick={() => (!isDisabled ? handleDelete(item.field, SOCIAL_MEDIA_TYPE.Tiktok) : null)}
                    />
                  </div>
                </div>
                {errors?.[`tiktok_${index + 1}`] && (
                  <div className='font-normal text-red text-xs pt-1'>{errors?.[`tiktok_${index + 1}`]}</div>
                )}
              </div>
            ))}
          </Field>

          <Field className='space-y-2'>
            <Label className='text-sm/6 font-medium text-secondary/80'>Instagram</Label>
            {formData?.instagram?.map((item, index) => (
              <div key={index}>
                <div className='flex gap-1.5 items-center'>
                  <Input
                    placeholder='Enter username'
                    value={item.username}
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleSocialMediaChange({ value: e.target.value, index, type: SOCIAL_MEDIA_TYPE.Instagram })
                    }
                    className={`disabled:bg-tetiary/15 disabled:text-secondary/15 disabled:border-tetiary/5 disabled:shadow-none placeholder:italic placeholder:text-secondary/40 block w-full rounded-lg 
                          border bg-white/5 py-1.5 px-3 text-sm/6 text-secondary focus:outline-none 
                          data-[focus]:outline-2 data-[focus]:-outline-offset-2 
                          ${
                            errors?.[`instagram_${index + 1}`]
                              ? ' border-red'
                              : '  border-secondary/15 data-[focus]:outline-secondary/25'
                          }`}
                  />
                  <div className='flex'>
                    <PlusCircleIcon
                      className={`w-6 h-6 ${
                        isDisabled ? 'text-secondary/10 cursor-not-allowed' : ' text-secondary/80 cursor-pointer'
                      }`}
                      onClick={() => !isDisabled && onPlusIconClicked(SOCIAL_MEDIA_TYPE.Instagram)}
                    />
                    <TrashIcon
                      className={`w-6 h-6 ${
                        isDisabled || index < 1 ? 'text-secondary/10 cursor-not-allowed' : 'text-red cursor-pointer'
                      }`}
                      onClick={() => (!isDisabled ? handleDelete(item.field, SOCIAL_MEDIA_TYPE.Instagram) : null)}
                    />
                  </div>
                </div>
                {errors?.[`instagram_${index + 1}`] && (
                  <div className='font-normal text-red text-xs pt-1'>{errors?.[`instagram_${index + 1}`]}</div>
                )}
              </div>
            ))}
          </Field>
        </div>
        <Field className='space-y-2'>
          <Label className='text-sm/6 font-medium text-secondary/80'>Employee</Label>
          <div>
            <EmployeesCombobox
              anchor='top'
              defaultValue={type === 'edit' ? selectedInfluencer?.employee : undefined}
              placeholder='Selected to assign manager'
              hasError={!!errors.employee}
              handleOnChange={(value: Employee) =>
                setFormData({
                  ...formData,
                  employee: value,
                })
              }
            />
            {errors?.employee && <div className='font-normal text-red text-xs pt-1'>{errors?.employee}</div>}{' '}
          </div>
        </Field>
      </Fieldset>

      <div className='mt-6 text-right'>
        <Button
          disabled={isSubmitting}
          className='inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-secondary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary/65 data-[focus]:outline-1 data-[focus]:outline-white'
          onClick={handleCreateInfluencer}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </>
  )
}

export default InfluencerForm
