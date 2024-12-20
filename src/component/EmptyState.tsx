import { FolderPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

type EmptyProps = {
  className?: string
  text?: string
}

export const Empty: React.FC<EmptyProps> = ({ className, text="No data" }) => {
  return (
    <div className='flex justify-center pt-12'>
      <div className={`text-center space-y-3 ${className}`}>
        <FolderPlusIcon className='w-12 h-12' />
        <p>{text}</p>
      </div>
    </div>
  )
}
