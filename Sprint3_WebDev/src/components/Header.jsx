import '../styles/Header.css'

function Header() {

  return (
    <>
    <div className="container">
      <nav>
        <a className ="logo" href="#">STOCAM</a>
        <div className="navs">
        <a href="">Sobre</a>
        <a href="">Serviço</a>
        <a href="">Contato</a>
        </div>
        
      </nav>
      <h1>Stocam, tenha controle e segurança.</h1>
      <p>Gerencie seu estoque com mais eficiência e segurança.
      O Stocam oferece controle total sobre entradas, saídas e produtos, ajudando você a evitar perdas, economizar tempo e tomar decisões com mais confiança. Simples, rápido e confiável — tudo o que você precisa para organizar seu negócio.</p>
      <a className='botao' href="#">Descobrir</a>
    </div>
    
    
    </>
  )
}

export default Header
