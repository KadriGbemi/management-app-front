import { ProfileProps, SocialMediaType } from "."

export enum SOCIAL_MEDIA {
  Tiktok = 1,
  Instagram = 2,
}

export interface Influencer {
  id: string
  first_name: string
  last_name: string
  employee?: ProfileProps
  social_media: SocialMediaType[]
}
