const projetos = [
    { título: "Projetos", descricao: "Meu site, com 5 páginas, no ar" },
    { título: "Protótipo Figma", descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio." },
    { título: "Minha página sobre mim", descricao: "Minha primeira página desenvolvida em HTML e CSS, estruturando a base da programação web." }
];

// Teste no console (mantido do seu código original)
console.log(projetos[0].título);

const listaProjetos = document.querySelector("#lista-projetos");

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

// Só executa o laço se a lista existir na página atual
if (listaProjetos) {
    for (const projeto of projetos) {
        criarCard(projeto);
    }
}