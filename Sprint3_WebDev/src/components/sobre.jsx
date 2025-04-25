import '../styles/sobre.css';
import { useState, useEffect, useRef } from 'react';

function Sobre() {
  const [titulo, setTitulo] = useState("Nossos Valores");
  const [texto, setTexto] = useState("Conheça quem somos e o que nos move a transformar o futuro.");
  const [cardSelecionado, setCardSelecionado] = useState(null);

  const cardsRef = useRef(null);

  const valores = [
    { titulo: "Segurança", descricao: "Protegemos seus dados com tecnologia de ponta." },
    { titulo: "Controle", descricao: "Oferecemos gestão eficiente e prática para seu negócio." },
    { titulo: "Precisão", descricao: "Entregamos resultados certeiros e confiáveis." },
    { titulo: "Confiança", descricao: "Construímos parcerias duradouras baseadas na credibilidade." },
  ];

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
    <>
      <div className="container1">
        <h1>{titulo}</h1>
        <p>{texto}</p>
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
      </div>
    </>
  );
}

export default Sobre;
