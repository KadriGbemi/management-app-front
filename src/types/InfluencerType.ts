import { SocialMediaType } from "."

export enum SOCIAL_MEDIA {
  Tiktok = 1,
  Instagram = 2,
}

export interface Influencer {
  first_name: string
  last_name: string
  employee?: {
    id: string
    name: string
    img: string
  }
  social_media: SocialMediaType[]
}
