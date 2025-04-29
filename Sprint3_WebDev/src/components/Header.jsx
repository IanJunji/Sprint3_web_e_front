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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto perferendis quo delectus. Natus, earum dolore rem rerum doloribus qui fugit necessitatibus, quibusdam quo quisquam aspernatur omnis saepe consequuntur voluptate temporibus.
      Amet inventore reiciendis cum distinctio at soluta mollitia ut accusantium dolore excepturi? Nam ad ipsum illum inventore sit vero odit dignissimos blanditiis eaque suscipit voluptates quod nesciunt provident, magnam obcaecati.</p>
      <a className='botao' href="#">Descobrir</a>
    </div>
    
    
    </>
  )
}

export default Header
