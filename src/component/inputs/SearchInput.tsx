import { Field, Input } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchInput() {
  return (
    <Field className='relative block w-full md:w-60'>
      <span className='sr-only'>Search input</span>

      <MagnifyingGlassIcon className='absolute text-secondary/40 inset-y-0 left-0 flex items-center content-center pl-2 w-6 h-full' />

      <Input
        placeholder='Search influencer...'
        className='placeholder:italic placeholder:text-secondary/40 block bg-white w-full border border-secondary/15 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-secondary/20 focus:ring-secondary/20 focus:ring-1 sm:text-sm'
      />
    </Field>
  )
}
