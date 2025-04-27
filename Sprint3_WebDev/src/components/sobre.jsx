import '../styles/sobre.css';
import { useState, useEffect, useRef } from 'react';

function Sobre() {
  const [titulo, setTitulo] = useState("Nossos Valores");
  const [texto, setTexto] = useState("Conheça quem somos e o que nos move a transformar o futuro.");
  const [cardSelecionado, setCardSelecionado] = useState(null);

  const cardsRef = useRef(null);
  const valores = [
    { 
      titulo: "Segurança", 
      descricao: "No Stocam, a segurança é uma prioridade. Utilizamos câmeras de alta tecnologia equipadas com Inteligência Artificial (IA) para garantir a proteção do seu estoque. As funcionalidades incluem:",
      listaItens: [
        "Identificação precisa de produtos, facilitando a gestão do inventário.",
        "Contagem de estoque em tempo real, assegurando que as quantidades estejam sempre corretas.",
        "Controle rigoroso da entrada e saída de itens, registrando cada movimentação de forma detalhada.",
        "Vigilância constante, atuando como um sistema de segurança para prevenir furtos e danos."
      ]
    },
    { 
      titulo: "Controle", 
      descricao: "Oferecemos gestão eficiente e prática para seu negócio, com ferramentas intuitivas que facilitam seu dia a dia.",
      listaItens: [
        "Dashboard personalizado com métricas importantes para seu negócio.",
        "Alertas de estoque baixo para nunca ficar sem produtos.",
        "Relatórios detalhados de vendas e movimentação de estoque.",
        "Interface amigável e fácil de usar, sem necessidade de treinamento extensivo."
      ]
    },
    { 
      titulo: "Precisão", 
      descricao: "Entregamos resultados certeiros e confiáveis, com informações detalhadas para suas tomadas de decisão.",
      listaItens: [
        "Algoritmos de IA que garantem contagem precisa de estoque.",
        "Margem de erro mínima nas previsões de demanda.",
        "Dados em tempo real para decisões rápidas e eficientes.",
        "Tecnologia de reconhecimento visual de última geração."
      ]
    },
    { 
      titulo: "Confiança", 
      descricao: "Construímos parcerias duradouras baseadas na credibilidade. Estamos ao seu lado em cada etapa.",
      listaItens: [
        "Suporte técnico 24/7 para resolver qualquer problema.",
        "Transparência total nos contratos e preços.",
        "Histórico comprovado de satisfação do cliente.",
        "Compromisso com a melhoria contínua de nossos serviços."
      ]
    },
  ];

  const renderTexto = (texto, listaItens) => {
    if (!listaItens || listaItens.length === 0) {
      return <p>{texto}</p>;
    }
    
    return (
      <>
        <p>{texto}</p>
        <ul className="lista-descricao">
          {listaItens.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </>
    );
  };

  const handleCardClick = (index) => {
    setTitulo(valores[index].titulo);
    setTexto(valores[index].descricao);
    setCardSelecionado(index);
  };

  useEffect(() => {
    const handleClickFora = (event) => {
      if (cardsRef.current && !cardsRef.current.contains(event.target)) {
        setTitulo("Nossos Valores");
        setTexto("Conheça quem somos e o que nos move a transformar o futuro.");
        setCardSelecionado(null);
      }
    };

    document.addEventListener('mousedown', handleClickFora);

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  return (
    <section className="container1" id="sobre">
      <h1 className="titulo-fixo">Sobre Nossa Empresa</h1>
      
      <div className="conteudo-wrapper">
        <div className="cards" ref={cardsRef}>
          {valores.map((valor, index) => (
            <div
              key={index}
              className={`card card-card${index + 1} ${cardSelecionado === index ? 'selecionado' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <h1>{valor.titulo}</h1>
            </div>
          ))}
        </div>
        
        <div className="conteudo-variavel">
          <h2 className="subtitulo">{titulo}</h2>
          {cardSelecionado !== null 
            ? renderTexto(valores[cardSelecionado].descricao, valores[cardSelecionado].listaItens)
            : <p>{texto}</p>}
        </div>
      </div>
    </section>
  );
}

export default Sobre;
