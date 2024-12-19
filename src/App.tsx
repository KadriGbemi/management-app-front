'use client'

import { Button } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import Logo from './assets/logo.svg'
import InfluencersList from './component/influencers/InfluencersList'

const navigation = [
  { name: 'Influencers', href: '#' },
  { name: 'Employees', href: '#' },
]

export default function App() {
  return (
    <div className='bg-custom-gradient font-nunito font-extralight'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav aria-label='Global' className='flex items-center justify-between p-6 lg:px-8'>
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img alt='Logo' src={Logo} className='h-8 w-auto text-secondary' />
            </a>
          </div>
          <div className='flex gap-x-12'>
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className='text-sm/6 font-semibold text-secondary'>
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className='pt-28 px-8 md:px-20 grid gap-8 mx-auto text-secondary'>
        <div className='flex justify-between items-center gap-4'>
          <div>
            <h3 className='font-medium text-lg'>Influencers</h3>
            <p>A list of all the influencers including their first and last name and their manager.</p>
          </div>
          <Button className='inline-flex text-nowrap items-center gap-1 rounded-md bg-primary h-10 px-3 cursor-pointer text-sm font-semibold text-dark shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary/65'>
            <PlusIcon className='h-5 w-5' /> <span>Create new influencer</span>
          </Button>
        </div>
        <InfluencersList />
      </main>
    </div>
  )
}
