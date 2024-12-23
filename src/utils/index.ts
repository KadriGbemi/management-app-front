import { RequestQueryProps } from "../types"

export const buildRequestQuery = ({ setApiUrl, query, apiUrl, payload, defaultPayload, setRequestPayload }: RequestQueryProps) => {
    if (apiUrl) {
        if (!query) {
            const params = new URLSearchParams(defaultPayload as Record<string, string>)
            const queryUrl = `${apiUrl}?${params.toString()}`
            setApiUrl?.(queryUrl)
            return setRequestPayload?.(defaultPayload)
        }

        if (query?.trim()) {
            const params = new URLSearchParams(payload as Record<string, string>)
            const queryUrl = `${apiUrl}?${params.toString()}`
            setApiUrl?.(queryUrl)
            return setRequestPayload?.(payload)
        }
    }
}

export const isEmpty = (obj: unknown) => {
    return JSON.stringify(obj) === '{}'
}