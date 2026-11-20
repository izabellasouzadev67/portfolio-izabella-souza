const { useState } = React;

const projetos = [
  {
    titulo: "Portfólio",
    descricao: "Este portfólio é um projeto pessoal criado com o objetivo de demonstrar as minhas competências técnicas em desenvolvimento front-end e design UI/UX. Ele foi construído utilizando HTML5, CSS3 e JavaScript, com o Figma sendo empregado para a criação de protótipos e wireframes.",
    categoria: "portfólio"
  },
  {
    titulo: "Projetos",
    descricao: "Meus projetos em React.",
    categoria: "projetos"
  },
  {
    titulo: "Formação",
    descricao: "Minha jornada de aprendizado e qualificações.",
    categoria: "formacao"
  },
  {
    titulo: "Contato",
    descricao: "Fale comigo.",
    categoria: "contato"
  },
  {
    titulo: "Calculadora",
    descricao: "Meu projeto em JavaScript.",
    categoria: "calculadora"
  }
];

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
  const [filtro, setFiltro] = useState("Todos");

  const visiveis = filtro === "Todos"
    ? projetos
    : projetos.filter((p) => p.categoria === filtro);

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