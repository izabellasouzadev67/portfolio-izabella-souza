const projetos = [
    { título: "Projetos", descricao: "Meu site, com 5 páginas, no ar" },
    { título: "Protótipo Figma", descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio." },
    { título: "Minha página sobre mim", descricao: "Minha primeira página desenvolvida em HTML e CSS, estruturando a base da programação web." }
];

// Teste no console (mantido do seu código original)
console.log(projetos[0].título);

const listaProjetos = document.querySelector("#lista-projetos");
const contagem = document.querySelector("#contagem");
let todos = []; // Variáve
// l global para armazenar todos os projetos
function criarCard(projeto) {
    const card = document.createElement("section");
    card.classList.add("card");
    
    const título = document.createElement("h2");
    título.textContent = projeto.título;
    
    const texto = document.createElement("p");
    texto.textContent = projeto.descricao;
    
    card.appendChild(título);
    card.appendChild(texto); // Corrigido de appenChild para appendChild
    
    listaProjetos.appendChild(card); // Corrigido de appenChild para appendChild
}

const mostrar =(lista) => {
        listaProjetos.innerHTML="";
        for (const projeto of lista) {
            criarCard(projeto);
        }
    const títulos= lista.map((projeto) => projeto.título);
    contagem.textContent=`${lista.length} projetos: ${títulos.join(",")}`;
    };


const filtrar =(categoria) => {
    const lista= todos.filter((projeto) => projeto.categoria === categoria);
    mostrar(lista);
};

fetch('projeto.json')
.then((resposta) => resposta.json())
.then((projetos) => {
    todos= projetos;
    mostrar(todos);
});

const botaoTodos=document.querySelector("#filtro-todos");
const botaoPáginaSobreMim=document.querySelector("#filtro-página-sobre-mim");
const botaoFigma=document.querySelector("#filtro-figma");
const botaoScratch=document.querySelector("#filtro-scratch");

botaoTodos.addEventListener("click", () => mostrar(todos));
botaoPáginaSobreMim.addEventListener("click", () => filtrar("página-sobre-mim"));
botaoFigma.addEventListener("click", () => filtrar("figma"));
botaoScratch.addEventListener("click", () => filtrar("scratch"));