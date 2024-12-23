import {  SocialMediaType } from "."
import { Employee } from "./EmployeeType"

export type SocialMediaAccountType = 'tiktok' | 'instagram'

export type DialogType = 'create' | 'edit'

export enum SOCIAL_MEDIA {
  Tiktok = 1,
  Instagram = 2,
}

export enum SOCIAL_MEDIA_TYPE {
  Tiktok = 'tiktok',
  Instagram = 'instagram',
}

interface InfluencerProps {
  id?: string
  first_name?: string
  last_name?: string
  employee?: Employee
}

export interface Influencer extends InfluencerProps {
  tiktok: SocialMediaType[]
  instagram: SocialMediaType[]
}

export interface SocialMediaFields {
  field: string,
  username?: string,
  plaform: number
}


export interface InfluencerFormErrorProps extends InfluencerProps {
  tiktok: SocialMediaFields[],
  instagram: SocialMediaFields[],
}
