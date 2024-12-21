import { ChangeEvent, useState, useEffect } from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useApiRequest } from '../../api'
import { Employee } from '../../types/EmployeeType'
import { Loading } from '../LoadingState'
import { DropdownProps } from '../../types'

export default function Dropdown({ setApiUrl, apiUrl }: DropdownProps) {
  const [query, setQuery] = useState('')
  const { data: employees, loading } = useApiRequest<Employee[]>(`/employees`, 'GET')

  const [selected, setSelected] = useState<Employee | null | undefined>(employees?.[0])

  const filteredEmployee =
    query === ''
      ? employees
      : employees?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        const params = new URLSearchParams({ employee: query })
        const queryUrl = `${apiUrl}?${params.toString()}`
        setApiUrl?.(queryUrl)
      }

      if(!query) setApiUrl?.(apiUrl)
    }, 2000)
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div className='w-full md:w-60'>
      <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
        <div className='relative'>
          <ComboboxInput
            placeholder='Filter by manager'
            autoComplete='off'
            className='w-full cursor-pointer rounded-lg border-none bg-secondary/15 py-1.5 pr-8 pl-3 text-sm/6 text-secondary/60 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-secondary/15'
            displayValue={(person: Employee) => person?.name}
            onChange={handleOnChange}
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
            <ChevronDownIcon className='size-4 fill-secondary/60 group-data-[hover]:fill-secondary' />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor='bottom'
          transition
          className=' w-[var(--input-width)] rounded-xl border border-secondary/5 bg-secondary/25 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        >
          <Loading className='w-32 h-32' isLoading={loading}>
            {filteredEmployee?.map((employee) => (
              <ComboboxOption
                key={employee.id}
                value={employee}
                className='group cursor-pointer flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-secondary'
              >
                <img alt='' src={employee?.img} className='inline-block size-8 rounded-full ring-2 ring-white' />
                <div className='text-sm/6 text-secondary'>{employee.name}</div>
              </ComboboxOption>
            ))}
          </Loading>
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
