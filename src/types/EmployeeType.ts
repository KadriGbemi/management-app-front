import { ProfileProps } from "."

export interface Employee extends ProfileProps {
    first_name: string
    last_name: string
    name: string
    company: string
    contact: string
}
