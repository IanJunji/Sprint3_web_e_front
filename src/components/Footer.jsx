import '../styles/Footer.css'
import scroll from './scrollToSection'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>STOCAM</h3>
          <p>Transformando o futuro do controle de estoque</p>
        </div>
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <a href="#sobre" onClick={(e) => scroll.scrollToSection(e, 'sobre')}>Sobre</a>
          <a href="#banner" onClick={(e) => scroll.scrollToSection(e, 'banner')}>Benefícios</a>
          <a href="#contato" onClick={(e) => scroll.scrollToSection(e, 'contato')}>Contato</a>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@stocam.com</p>
          <p>Telefone: (11) 1234-5678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 STOCAM. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
