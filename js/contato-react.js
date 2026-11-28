const { useState } = React;

const Contato = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");
  const [tipo, setTipo] = useState("");

  const enviar = (evento) => {
    evento.preventDefault();
    const letras = mensagem.trim().length;
    if (letras < 10) {
      setResposta(`Faltam ${10 - letras} letras.`);
      setTipo("erro");
    } else {
      setResposta(`Obrigado, ${nome}!`);
      setTipo("");
      setNome("");
      setEmail("");
      setMensagem("");
    }
  };

  return (
    <main>
      <h1>Fale comigo</h1>
      <section className="card">
        <form onSubmit={enviar}>
          <p>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
              required
            />
          </p>
          <p>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              required
            />
          </p>
          <p>
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
            />
          </p>
          <p>{mensagem.trim().length} letras</p>
          <button type="submit">Enviar</button>
        </form>
        <p id="resposta" className={tipo}>{resposta}</p>
      </section>
    </main>
  );
};

const raiz = ReactDOM.createRoot(document.querySelector("#raiz"));
raiz.render(<Contato />);