const { useState, useEffect } = React;

const Card = ({ titulo, descricao }) => {
  const [curtidas, setCurtidas] = useState(0);

  return (
    <article className="card">
      <h2>{titulo}</h2>
      <p>{descricao}</p>
      <button
        type="button"
        className="btn-curtir"
        onClick={() => setCurtidas(curtidas + 1)}
      >
        ❤️ Curtir ({curtidas})
      </button>
    </article>
  );
};

const App = () => {
  const [projetos, setProjetos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  useEffect (() => {
    fetch("projetos.json")
      .then((resposta) => resposta.json())
      .then((dados) => setProjetos(dados));
  } ,[]);
  if (projetos.length === 0) {
    return <main> <p>Carregando projetos... </p></main>;
  }
  let visiveis = projetos;
    if (filtro !== "Todos") {
      visiveis = projetos.filter((p) => p.categoria === filtro);
    }

  return (
    <main className="react-projetos">
      <h1>Meus projetos em React</h1>

      <div className="filtros">
        <button
          type="button"
          className={filtro === "Todos" ? "ativo" : ""}
          onClick={() => setFiltro("Todos")}
        >
          Todos
        </button>
        <button
          type="button"
          className={filtro === "portfólio" ? "ativo" : ""}
          onClick={() => setFiltro("portfólio")}
        >
          Portfólio
        </button>
        <button
          type="button"
          className={filtro === "projetos" ? "ativo" : ""}
          onClick={() => setFiltro("projetos")}
        >
          Projetos
        </button>
      </div>

      <p className="contagem-react">
        {visiveis.length} {visiveis.length === 1 ? "projeto" : "projetos"}
      </p>

      <div className="lista-cards-react">
        {visiveis.map((projeto) => (
          <Card
            key={projeto.titulo}
            titulo={projeto.titulo}
            descricao={projeto.descricao}
          />
        ))}
      </div>
    </main>
  );
};

const raiz = ReactDOM.createRoot(document.querySelector("#raiz"));
raiz.render(<App />);