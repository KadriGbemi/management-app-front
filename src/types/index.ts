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

export interface QueryProps {
    setApiUrl?: Function
    apiUrl?: string
    requestPayload?: QueryPayloadProps
    setRequestPayload?: Function
    containerClassName?: string
    anchor?: 'bottom' | 'top'
    placeholder?: string
    handleOnChange?: Function
}

export interface QueryPayloadProps {
    first_name?: string
    last_name?: string
    employee?: string
}

export interface RequestQueryProps {
    setApiUrl?: Function,
    query?: string
    apiUrl?: string
    payload: QueryPayloadProps
    defaultPayload?: QueryPayloadProps
    setRequestPayload?: Function
}