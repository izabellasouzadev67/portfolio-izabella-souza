/* ==========================================================
   GERENCIAMENTO DE PROJETOS E FILTROS DINÂMICOS
   ========================================================== */

const listaProjetos = document.querySelector("#lista-projetos");
const contagem = document.querySelector("#contagem");
let todos = []; // Variável global para armazenar todos os projetos carregados

// Função para criar o elemento visual (card) de cada projeto
function criarCard(projeto) {
    if (!listaProjetos) return; // Segurança caso a página não tenha esse elemento

    const card = document.createElement("section");
    card.classList.add("card-projeto"); // Atualizado para usar a mesma classe do seu CSS de projetos
    
    const iconeDiv = document.createElement("div");
    iconeDiv.classList.add("projeto-icone");
    iconeDiv.innerHTML = '<i class="fa-solid fa-code"></i>'; // Ícone padrão
    
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("projeto-info");

    const título = document.createElement("h2");
    título.textContent = projeto.título;
    
    const texto = document.createElement("p");
    texto.textContent = projeto.descricao;
    
    infoDiv.appendChild(título);
    infoDiv.appendChild(texto);

    // Se houver link no projeto, cria o botão de ver mais
    if (projeto.link) {
        const link = document.createElement("a");
        link.href = projeto.link;
        link.target = "_blank";
        link.className = "btn-projeto";
        link.innerHTML = 'Ver Projeto <i class="fa-solid fa-arrow-right"></i>';
        infoDiv.appendChild(link);
    }

    card.appendChild(iconeDiv);
    card.appendChild(infoDiv);
    
    listaProjetos.appendChild(card);
}

// Função para exibir os projetos na tela e atualizar a contagem
const mostrar = (lista) => {
    if (!listaProjetos) return;
    
    listaProjetos.innerHTML = "";
    for (const projeto of lista) {
        criarCard(projeto);
    }
    
    if (contagem) {
        const títulos = lista.map((projeto) => projeto.título);
        contagem.textContent = `${lista.length} projetos exibidos: ${títulos.join(", ")}`;
    }
};

// Função de filtro por categoria
const filtrar = (categoria) => {
    const lista = todos.filter((projeto) => projeto.categoria === categoria);
    mostrar(lista);
};

// Exemplo de fallback caso você ainda não esteja usando um arquivo projeto.json externo
const projetosLocais = [
    { título: "Protótipos do Figma", descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio.", categoria: "figma", link: "https://www.figma.com" },
    { título: "Página Sobre Mim", descricao: "Minha primeira página desenvolvida em HTML, CSS e JavaScript.", categoria: "página-sobre-mim", link: "sobre.html" },
    { título: "Lâmpada Interativa", descricao: "Mini projeto utilizando HTML, CSS puro e JavaScript.", categoria: "lampada", link: "https://github.com/izabellasouzadev67/lampada" },
    { título: "Calculadora Básica", descricao: "Mini projeto de calculadora básica em Front-End.", categoria: "calculadora", link: "https://github.com/izabellasouzadev67/calculadora" }
];

// Tenta buscar via fetch, se não achar (ou se rodar local sem servidor), usa os projetos locais acima
fetch('projeto.json')
    .then((resposta) => {
        if (!resposta.ok) throw new Error("Arquivo json não encontrado");
        return resposta.json();
    })
    .then((projetos) => {
        todos = projetos;
        mostrar(todos);
    })
    .catch((erro) => {
        console.log("Usando dados locais de projetos:", erro);
        todos = projetosLocais;
        mostrar(todos);
    });

/* ==========================================================
   CONFIGURAÇÃO DOS BOTÕES DE FILTRO (Com verificação de segurança)
   ========================================================== */
const botaoTodos = document.querySelector("#filtro-todos");
const botaoPáginaSobreMim = document.querySelector("#filtro-página-sobre-mim");
const botaoFigma = document.querySelector("#filtro-figma");
const botaoLampada = document.querySelector("#filtro-lampada");
const botaoCalculadora = document.querySelector("#filtro-calculadora");

if (botaoTodos) botaoTodos.addEventListener("click", () => mostrar(todos));
if (botaoPáginaSobreMim) botaoPáginaSobreMim.addEventListener("click", () => filtrar("página-sobre-mim"));
if (botaoFigma) botaoFigma.addEventListener("click", () => filtrar("figma"));
if (botaoLampada) botaoLampada.addEventListener("click", () => filtrar("lampada"));
if (botaoCalculadora) botaoCalculadora.addEventListener("click", () => filtrar("calculadora"));