import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Dashboard from './components/dashboard'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
    <App />
  </StrictMode>
)
