import "../styles/banner.css";
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <>
      <section className="beneficios_content" id="banner">
        <div className="header">
          <h1>
            Impulsione seu negócio <span>com Stocam</span>
          </h1>
          <h2>
            Explore os beneficios da melhor solução de controle de estoque do
            mercado.
          </h2>
          <h3>Faça parte do novo mundo do controle de armazenagem.</h3>
          <Link to="/cadastro" className='botao'>Vamos!</Link>
        </div>
      </section>
    </>
  );
}

export default Banner;
