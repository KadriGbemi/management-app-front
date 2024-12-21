import { RequestQueryProps } from "../types"

export const buildRequestQuery = ({ setApiUrl, query, apiUrl, payload, defaultPayload, setRequestPayload }: RequestQueryProps) => {

    if (apiUrl && setApiUrl) {
        if (!query) {
            const params = new URLSearchParams(defaultPayload as Record<string, string>)
            const queryUrl = `${apiUrl}?${params.toString()}`
            setApiUrl?.(queryUrl)
            setRequestPayload(defaultPayload)
        }

        if (query?.trim()) {
            const params = new URLSearchParams(payload as Record<string, string>)
            const queryUrl = `${apiUrl}?${params.toString()}`
            setApiUrl?.(queryUrl)
            setRequestPayload(payload)
        }
    }
}