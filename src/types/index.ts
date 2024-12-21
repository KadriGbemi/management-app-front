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


export interface DropdownProps {
    setApiUrl?: Function
    apiUrl?: string
}
