import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useApiRequest } from '../../api'
import { Influencer, SOCIAL_MEDIA } from '../../types/InfluencerType'
import { Loading } from '../Loading'
import { SocialMediaType } from '../../types'
import SocialMediaIcon from '../SocialMediaIcon'

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
        <p className='flex items-center gap-1'>
          {' '}
          <SocialMediaIcon platform={SOCIAL_MEDIA.Tiktok} /> {getAllTiktokAccounts}
        </p>
      ) : null}
      {getAllInstagramAccounts ? (
        <p className='flex items-center gap-1'>
          <SocialMediaIcon platform={SOCIAL_MEDIA.Instagram} /> {getAllInstagramAccounts}
        </p>
      ) : null}
    </div>
  )
}

const InfluencersList = () => {
  const { data: influencers, loading } = useApiRequest<Influencer[]>(`/influencers`, 'GET')

  console.log('influencers', influencers)

  return (
    <div className='pt-4 pb-10'>
      <Loading isLoading={loading}>
        <table className='table-auto text-sm bg-white rounded-xl text-left rtl:text-right w-full shadow-lg'>
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
      </Loading>
    </div>
  )
}

export default InfluencersList
