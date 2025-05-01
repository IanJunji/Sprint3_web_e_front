import "../styles/contato.css";
import { useState } from "react";

function Contato() {
  const [indexSelecionado, setIndexSelecionado] = useState(null);

  const toggleAccordion = (index) => {
    setIndexSelecionado(indexSelecionado === index ? null : index);
  };

  const accordions = [
    {
      id: 1,
      titulo: "Como é feito o controle do estoque?",
      conteudo: "O controle é feito através de cameras pocisionadas estratégicamente no estoque"
    },
    {
      id: 2,
      titulo: "Quais os requisitos do local?",
      conteudo: "Evite comprar dispositivos não certificados pela Anvisa..."
    },
    {
      id: 3,
      titulo: "Qual o tamanho máximo do estoque?",
      conteudo: "Confira nossa central de ajuda antes de enviar uma mensagem..."
    },
    {
      id: 4,
      titulo: "Como a manutenção é feita?",
      conteudo: "Você pode nos contatar por e-mail, telefone ou WhatsApp..."
    },
  ];

  return (
    <div className="contato_textos" id="contato">
      <h1>Contato - Stocam</h1>
      <h3>
        Fale com um de nossos representantes para saber mais informações e contratar nosso serviço.
      </h3>
      <h2>Veja abaixo os tópicos mais buscados</h2>

      <div className="accordion">
        {accordions.map((item) => (
          <div key={item.id}>
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={indexSelecionado === item.id}
              aria-controls={`content-${item.id}`}
              id={`accordion-${item.id}`}
            >
              {item.titulo}
              <span>{indexSelecionado === item.id ? "-" : "+"}</span>
            </button>
            <div
              id={`content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-${item.id}`}
              className={`accordion-content ${indexSelecionado === item.id ? "open" : ""}`}
            >
              <p>{item.conteudo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contato;
