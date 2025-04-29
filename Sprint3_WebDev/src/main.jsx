import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Sobre from './components/sobre'
import Footer from './components/Footer'
import Contato from './components/contato'
import Form from './components/form'
import Servico from './components/servico'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sobre />
    <Servico />
    <Contato />
    <Form />
    <Footer />
  </StrictMode>
)
