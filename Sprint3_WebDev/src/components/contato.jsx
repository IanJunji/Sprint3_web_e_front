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
      titulo: "Recomendação contra fraude",
      conteudo: "Jamais compartilhe seus dados bancários por mensagens..."
    },
    {
      id: 2,
      titulo: "Atenção: golpe na venda de aparelhos de medição",
      conteudo: "Evite comprar dispositivos não certificados pela Anvisa..."
    },
    {
      id: 3,
      titulo: "Dúvidas sobre o serviço da Stocam",
      conteudo: "Confira nossa central de ajuda antes de enviar uma mensagem..."
    },
    {
      id: 4,
      titulo: "Formas de contato",
      conteudo: "Você pode nos contatar por e-mail, telefone ou WhatsApp..."
    },
  ];

  return (
    <div className="contato_textos">
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
