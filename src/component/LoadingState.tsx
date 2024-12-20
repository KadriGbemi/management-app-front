import React, { ReactNode } from 'react'

type LoaderProps = {
  isLoading: boolean
  children: ReactNode
  className?: string
}

export const Loading: React.FC<LoaderProps> = ({ isLoading, children, className }) => {
  return (
    <>
      {isLoading ? (
        <div className={`relative w-16 h-16 mx-auto ${className}`}>
          <div className='absolute top-0 left-0 w-16 h-16 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent'></div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

