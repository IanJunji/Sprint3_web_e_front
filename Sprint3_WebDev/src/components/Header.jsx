import '../styles/Header.css'
import scroll from './scrollToSection'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <div className="container_header">
      <nav>
        <Link to="/" className="logo">STOCAM</Link>
        <div className="navs">
          <a href="#sobre" onClick={(e) => scroll.scrollToSection(e, 'sobre')}>Sobre</a>
          <a href="#banner" onClick={(e) => scroll.scrollToSection(e, 'banner')}>Serviço</a>
          <a href="#contato" onClick={(e) => scroll.scrollToSection(e, 'contato')}>Contato</a>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/cadastro" className="register-btn">Cadastro</Link>
        </div>
      </nav>
      <h1>Stocam, tenha <span className="highlight">controle</span> e <span className="highlight">segurança</span>.</h1>
      <p>Gerencie seu estoque com mais <span className="highlight">eficiência</span> e <span className="highlight">segurança</span>.
      O Stocam oferece <span className="highlight">controle total</span> sobre entradas, saídas e produtos, ajudando você a <span className="highlight">evitar perdas</span>, <span className="highlight">economizar tempo</span> e tomar decisões com mais <span className="highlight">confiança</span>. <span className="highlight">Simples</span>, <span className="highlight">rápido</span> e <span className="highlight">confiável</span> — tudo o que você precisa para organizar seu negócio.</p>
      <a className='botao' href="#descobrir"onClick={(e) => scroll.scrollToSection(e, 'sobre')}>Descobrir</a>
    </div>
    </>
  )
}

export default Header
