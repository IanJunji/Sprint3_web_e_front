import '../styles/Header.css'
import scroll from './scrollToSection'

function Header() {
  return (
    <>
    <div className="container">
      <nav>
        <a className="logo" href="#">STOCAM</a>
        <div className="navs">
          <a href="#sobre" onClick={(e) => scroll.scrollToSection(e, 'sobre')}>Sobre</a>
          <a href="#banner" onClick={(e) => scroll.scrollToSection(e, 'banner')}>Serviço</a>
          <a href="#contato" onClick={(e) => scroll.scrollToSection(e, 'contato')}>Contato</a>
        </div>
      </nav>
      <h1>Stocam, tenha controle e segurança.</h1>
      <p>Gerencie seu estoque com mais eficiência e segurança.
      O Stocam oferece controle total sobre entradas, saídas e produtos, ajudando você a evitar perdas, economizar tempo e tomar decisões com mais confiança. Simples, rápido e confiável — tudo o que você precisa para organizar seu negócio.</p>
      <a className='botao' href="#descobrir"onClick={(e) => scroll.scrollToSection(e, 'sobre')}>Descobrir</a>
    </div>
    </>
  )
}

export default Header
