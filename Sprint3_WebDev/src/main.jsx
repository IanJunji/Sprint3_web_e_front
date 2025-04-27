import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Sobre from './components/sobre'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sobre />
    <Footer />
  </StrictMode>
)
