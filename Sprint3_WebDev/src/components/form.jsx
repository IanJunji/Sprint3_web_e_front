import { useState } from "react";
import "../styles/form.css";

function Form() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.mensagem) {
      alert("Preencha todos os campos!");
      return;
    }

    // Aqui você pode integrar com backend ou API externa
    console.log("Dados enviados:", form);
    setEnviado(true);
    setForm({ nome: "", email: "", mensagem: "" });
  };

  return (
    <div className="formulario-container">
      <h2>Envie sua mensagem</h2>
      {enviado && <p className="sucesso">Mensagem enviada com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="mensagem"
          placeholder="Sua mensagem"
          value={form.mensagem}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Form;
