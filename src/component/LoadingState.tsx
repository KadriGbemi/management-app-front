import React, { ReactNode } from 'react'

type LoaderProps = {
  isLoading: boolean
  children: ReactNode
  className?: string
}

export const Loading: React.FC<LoaderProps> = ({ isLoading, children, className="w-16 h-16" }) => {
  return (
    <>
      {isLoading ? (
        <div className={`relative mx-auto text-center flex justify-center content-center items-center ${className}`}>
          <div className='absolute w-16 h-16 border-8 border-secondary/20 border-solid rounded-full animate-spin border-t-transparent'></div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

