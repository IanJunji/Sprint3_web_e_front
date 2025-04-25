import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Sobre from './components/sobre'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sobre />
  </StrictMode>
)
