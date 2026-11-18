const projetos = [
  { titulo: "Portfólio", descricao: "Este portfólio é um projeto pessoal criado com o objetivo de demonstrar as  minhas competências técnicas em desenvolvimento front-end e design UI/UX  Ele foi construído utilizando HTML5, CSS3 e JavaScript, com o Figma sendo empregado para a criação de protótipos e wireframes." },
  { titulo: "Projetos", descricao: "Meus projetos em React." },
  { titulo: "Fromação", descricao: "Os treinos da semana na academia." },
  { titulo: "Playlist", descricao: "As músicas que mais escuto." },
  { titulo: "Calculadora", descricao: "Meu próximo projeto em JavaScript." },
];

const Card = (props) => {
  return (
    <section className="card">
      <h2>{props.titulo}</h2>
      <p>{props.descricao}</p>
    </section>
  );
};

const App = () => {
  return (
    <main>
      <h1>Meus projetos em React</h1>
      <p>{projetos.length} projetos</p>
      {projetos.map((projeto) => (
        <Card
          key={projeto.titulo}
          titulo={projeto.titulo}
          descricao={projeto.descricao}
        />
      ))}
    </main>
  );
};

const raiz = ReactDOM.createRoot(document.querySelector("#raiz"));
raiz.render(<App />);