export interface SocialMediaType {
    plaform: number
    field: string
    username: string
}

export interface ProfileProps {
    id: string
    name: string
    img: string
}

export interface ComboboxProps {
    setApiUrl?: Function
    apiUrl?: string
}

export interface RequestQueryProps {
    setApiUrl?: Function,
    query?: string
    apiUrl?: string
}