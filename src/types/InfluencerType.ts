import { ProfileProps, SocialMediaType } from "."

export type SocialMediaAccountType = 'tiktok' | 'instagram'

export enum SOCIAL_MEDIA {
  Tiktok = 1,
  Instagram = 2,
}

export enum SOCIAL_MEDIA_TYPE {
  Tiktok = 'tiktok',
  Instagram = 'instagram',
}


export interface Influencer {
  id?: string
  first_name?: string
  last_name?: string
  employee?: ProfileProps
  social_media?: SocialMediaType[]
}

export interface SocialMediaFields {
  field: string,
  username?: string,
  plaform: number
}


export interface InfluencerFormProps extends Influencer {
  tiktok: SocialMediaFields[],
  instagram: SocialMediaFields[],
}
