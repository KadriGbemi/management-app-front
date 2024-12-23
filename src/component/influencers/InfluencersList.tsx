import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useApiRequest } from '../../api'
import { Influencer, SOCIAL_MEDIA } from '../../types/InfluencerType'
import { Loading } from '../LoadingState'
import { QueryPayloadProps, SocialMediaType } from '../../types'
import SocialMediaIcon from '../SocialMediaIcon'
import { Empty } from '../EmptyState'
import { Button } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import EmployeesCombobox from '../inputs/employees/Combobox'
import SearchInput from '../inputs/SearchInput'
import { useState } from 'react'
import DialogComponent from '../dialog'

const getSocialMediaAccounts = (socialMediaData?: SocialMediaType[]) => {
  if (!socialMediaData?.length) return null

  let getAllTiktokAccounts = ''
  let getAllInstagramAccounts = ''

  for (let data of socialMediaData) {
    if (data.plaform === SOCIAL_MEDIA.Tiktok) {
      getAllTiktokAccounts += `${getAllTiktokAccounts.length ? ',' : ''} @${data.username}`
    }

    if (data.plaform === SOCIAL_MEDIA.Instagram) {
      getAllInstagramAccounts += `${getAllInstagramAccounts ? ',' : ''} @${data.username}`
    }
  }

  return (
    <div className='grid grid-cols-1 gap-2 lowercase'>
      {getAllTiktokAccounts ? (
        <div className='flex items-center gap-1'>
          {' '}
          <SocialMediaIcon platform={SOCIAL_MEDIA.Tiktok} /> {getAllTiktokAccounts}
        </div>
      ) : null}
      {getAllInstagramAccounts ? (
        <div className='flex items-center gap-1'>
          <SocialMediaIcon platform={SOCIAL_MEDIA.Instagram} /> {getAllInstagramAccounts}
        </div>
      ) : null}
    </div>
  )
}

const InfluencersList = () => {
  const [apiUrl, setApiUrl] = useState('/influencers')
  const [requestPayload, setRequestPayload] = useState<QueryPayloadProps | undefined>()
  const [reloadData, setReloadData] = useState(false)
  const { data: influencers, loading } = useApiRequest<Influencer[]>(apiUrl, 'GET', reloadData)

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)

  return (
    <>
      <DialogComponent isOpen={isOpenCreateForm} setIsOpen={setIsOpenCreateForm} handleDataRefresh={()=> setReloadData()} />

      <div className='flex justify-between items-center gap-4'>
        <div>
          <h3 className='font-medium text-lg'>Influencers</h3>
          <p>A list of all the influencers including their first and last name and their manager.</p>
        </div>
        <Button
          onClick={() => setIsOpenCreateForm(true)}
          className='inline-flex text-nowrap items-center gap-1 rounded-md bg-primary h-10 px-3 cursor-pointer text-sm font-semibold text-dark shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary/65'
        >
          <PlusIcon className='h-5 w-5' /> <span>Create new influencer</span>
        </Button>
      </div>

      <div className='pt-4 pb-10'>
        <div className='bg-white rounded-xl gap-4 grid grid-cols-1 text-left rtl:text-right w-full shadow-lg py-8'>
          <div className='flex justify-between px-8 flex-wrap gap-6'>
            <SearchInput
              setApiUrl={setApiUrl}
              apiUrl='/influencers'
              requestPayload={requestPayload}
              setRequestPayload={setRequestPayload}
            />
            <EmployeesCombobox
              setApiUrl={setApiUrl}
              containerClassName='w-full md:w-60'
              apiUrl='/influencers'
              requestPayload={requestPayload}
              setRequestPayload={setRequestPayload}
            />
          </div>
          <Loading isLoading={loading}>
            {influencers?.length ? (
              <table className='table-auto text-sm w-full'>
                <thead className='text-xs text-secondary uppercase border-b border-secondary/10'>
                  <tr>
                    <th scope='col' className='px-8 py-6'>
                      First name
                    </th>
                    <th scope='col' className='px-8 py-6 hidden md:table-cell'>
                      Last name
                    </th>
                    <th scope='col' className='px-8 py-6'>
                      Social media
                    </th>
                    <th scope='col' className='hidden md:table-cell md:px-8 md:py-6'>
                      Manager
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {influencers?.map((influencer, index) => (
                    <tr
                      key={influencer.id}
                      className={`odd:bg-white even:bg-secondary/5 rounded-bl-lg rounded-br-lg ${
                        influencers?.length - 1 !== index ? 'border-b border-secondary/10' : ''
                      } `}
                    >
                      <td className='px-8 py-4 whitespace-nowrap'>{influencer.first_name}</td>
                      <td className='px-8 hidden md:table-cell'> {influencer.last_name}</td>
                      <td className='px-8 py-4'> {getSocialMediaAccounts(influencer?.social_media)}</td>
                      <td className='px-8 hidden md:table-cell'>
                        {' '}
                        <div className='space-x-2 text-nowrap'>
                          <img
                            alt=''
                            src={influencer?.employee?.img}
                            className='inline-block size-8 rounded-full ring-2 ring-white'
                          />
                          <span>{influencer?.employee?.name}</span>
                        </div>
                      </td>

                      <td className='px-3 py-4'>
                        {' '}
                        <PencilSquareIcon className='h-4 w-4 text-secondary cursor-pointer' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty />
            )}
          </Loading>
        </div>
      </div>
    </>
  )
}

export default InfluencersList
