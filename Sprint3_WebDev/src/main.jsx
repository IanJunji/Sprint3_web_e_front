import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Sobre from './components/sobre'
import Contato from './components/contato'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sobre />
    <Contato />
  </StrictMode>
)
