import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import Alert from '../component/Alerts'

interface NotificationContextProps {
  setError?: Function
  error?: string
  setSuccess?: Function
  success?: string
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')

        return () => clearTimeout(timer)
      }, 3000)
    }
  }, [setError, error])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('')

        return () => clearTimeout(timer)
      }, 3000)
    }
  }, [setSuccess, success])

  return (
    <NotificationContext.Provider value={{ error, setError, success, setSuccess }}>
      {error ? <Alert message={error} setMessage={setError} type='error' /> : null}
      {success ? <Alert message={success} setMessage={setSuccess} type='success' /> : null}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
