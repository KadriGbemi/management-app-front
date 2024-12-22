import { useState, useEffect } from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useApiRequest } from '../../../api'
import { Employee } from '../../../types/EmployeeType'
import { Loading } from '../../LoadingState'
import { QueryProps } from '../../../types'
import { buildRequestQuery } from '../../../utils'

export default function EmployeesCombobox({
  setApiUrl,
  apiUrl,
  requestPayload,
  setRequestPayload,
  containerClassName,
  anchor = 'bottom',
  handleOnChange,
  placeholder = 'Filter by manager',
}: QueryProps) {
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
    if (selected?.name) {
      const payload = { ...requestPayload, employee: selected?.name.trim() }

      buildRequestQuery({
        setApiUrl,
        apiUrl,
        query: selected?.name,
        payload,
        setRequestPayload,
      })

      setRequestPayload?.(payload)
    }
  }, [selected?.name])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const payload = { ...requestPayload, employee: query.trim() }

      buildRequestQuery({
        setApiUrl,
        apiUrl,
        query,
        defaultPayload: { ...requestPayload, employee: '' },
        payload,
        setRequestPayload,
      })

      setRequestPayload?.(payload)
    }, 1500)
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <div className={containerClassName}>
      <Combobox
        value={selected}
        onChange={(value: Employee) => {
          setSelected(value)
          handleOnChange?.(value)
        }}
        onClose={() => setQuery('')}
        as='div'
      >
        <div className='relative'>
          <ComboboxInput
            placeholder={placeholder}
            autoComplete='off'
            className='w-full cursor-pointer rounded-lg border-none bg-secondary/10 py-1.5 pr-8 pl-3 text-sm/6 text-secondary/60 focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-secondary/10'
            displayValue={(person: Employee) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
            <ChevronDownIcon className='size-4 fill-secondary/60 group-data-[hover]:fill-secondary' />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor={anchor}
          transition
          className='z-50 w-[var(--input-width)] rounded-xl border border-secondary/5 bg-white
          p-1 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in
           data-[leave]:data-[closed]:opacity-0'
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
