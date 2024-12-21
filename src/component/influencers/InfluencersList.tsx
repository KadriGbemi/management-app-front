import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useApiRequest } from '../../api'
import { Influencer, SOCIAL_MEDIA } from '../../types/InfluencerType'
import { Loading } from '../LoadingState'
import { QueryPayloadProps, SocialMediaType } from '../../types'
import SocialMediaIcon from '../SocialMediaIcon'
import { Empty } from '../EmptyState'
import Combobox from '../inputs/Combobox'
import SearchInput from '../inputs/SearchInput'
import { useState } from 'react'
import ErrorAlert from '../ErrorAlert'

const getSocialMediaAccounts = (socialMediaData: SocialMediaType[]) => {
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
  const { data: influencers, loading, error, setError } = useApiRequest<Influencer[]>(apiUrl, 'GET')

  return (
    <div className='pt-4 pb-10'>
      {error ? <ErrorAlert error={error} setError={setError} /> : null}
      <div className='bg-white rounded-xl gap-4 grid grid-cols-1 text-left rtl:text-right w-full shadow-lg py-8'>
        <div className='flex justify-between px-8 flex-wrap gap-6'>
          <SearchInput setApiUrl={setApiUrl} apiUrl='/influencers' requestPayload={requestPayload} setRequestPayload={setRequestPayload}/>
          <Combobox setApiUrl={setApiUrl} apiUrl='/influencers' requestPayload={requestPayload} setRequestPayload={setRequestPayload}/>
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
                    <td className='px-8 py-4'> {getSocialMediaAccounts(influencer.social_media)}</td>
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
  )
}

export default InfluencersList
