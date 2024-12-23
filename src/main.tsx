import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { NotificationProvider } from './context/Notification.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </StrictMode>
)
