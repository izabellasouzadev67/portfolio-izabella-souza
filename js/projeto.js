/* ==========================================================
   GERENCIAMENTO DE PROJETOS E FILTROS DINÂMICOS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const listaProjetos = document.querySelector("#lista-projetos");
    const contagem = document.querySelector("#contagem");

    const projetos = [
        {
            titulo: "Protótipo Figma",
            descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio.",
            categoria: "figma",
            link: "https://www.figma.com/files/team/1687251064527399275/folder/663341080?fuid=1687251063166864576",
            icone: '<i class="fa-brands fa-figma"></i>'
        },
        {
            titulo: "Minha página sobre mim",
            descricao: "Minha primeira página desenvolvida em HTML, CSS e JavaScript, estruturando a base da programação web.",
            categoria: "pagina-sobre-mim",
            link: "sobre.html",
            icone: '<i class="fa-solid fa-user"></i>'
        },
        {
            titulo: "Site de Turismo",
            descricao: "Projeto em grupo para divulgar pontos turísticos e rotas acessíveis, utilizando HTML, CSS e JavaScript para interatividade.",
            categoria: "turismo",
            link: "",
            icone: '<i class="fa-solid fa-tree"></i>'
        },
        {
            titulo: "Lâmpada Interativa",
            descricao: "Mini projeto de uma lâmpada interativa utilizando HTML, CSS puro e JavaScript.",
            categoria: "lampada",
            link: "https://github.com/izabellasouzadev67/lampada",
            icone: '<i class="fa-solid fa-lightbulb"></i>'
        },
        {
            titulo: "Calculadora Básica",
            descricao: "Mini projeto de uma calculadora básica utilizando HTML, CSS puro e JavaScript.",
            categoria: "calculadora",
            link: "https://github.com/izabellasouzadev67/calculadora",
            icone: '<i class="fa-solid fa-calculator"></i>'
        }
    ];

    function obterIcone(projeto) {
        if (projeto.icone) return projeto.icone;

        const texto = `${projeto.categoria || ""} ${projeto.titulo || ""}`.toLowerCase();
        if (texto.includes("figma")) return '<i class="fa-brands fa-figma"></i>';
        if (texto.includes("lampada") || texto.includes("lâmpada")) return '<i class="fa-solid fa-lightbulb"></i>';
        if (texto.includes("calculadora")) return '<i class="fa-solid fa-calculator"></i>';
        if (texto.includes("turismo")) return '<i class="fa-solid fa-tree"></i>';
        if (texto.includes("sobre")) return '<i class="fa-solid fa-user"></i>';
        return '<i class="fa-solid fa-code"></i>';
    }

    function criarCard(projeto) {
        if (!listaProjetos) return;

        const card = document.createElement("section");
        card.classList.add("card-projeto");

        const iconeDiv = document.createElement("div");
        iconeDiv.classList.add("projeto-icone");
        iconeDiv.innerHTML = obterIcone(projeto);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("projeto-info");

        const tituloEl = document.createElement("h2");
        tituloEl.textContent = projeto.titulo;

        const textoEl = document.createElement("p");
        textoEl.textContent = projeto.descricao;

        infoDiv.appendChild(tituloEl);
        infoDiv.appendChild(textoEl);

        const urlProjeto = projeto.link || "#";
        const link = document.createElement("a");
        link.href = urlProjeto;
        if (urlProjeto.startsWith("http")) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        link.className = "btn-projeto";
        link.innerHTML = 'Ver Projeto <i class="fa-solid fa-arrow-right"></i>';
        infoDiv.appendChild(link);

        card.appendChild(iconeDiv);
        card.appendChild(infoDiv);
        listaProjetos.appendChild(card);
    }

    const mostrar = (lista) => {
        if (!listaProjetos) return;

        listaProjetos.innerHTML = "";
        for (const projeto of lista) {
            criarCard(projeto);
        }

        if (contagem) {
            const titulos = lista.map((projeto) => projeto.titulo);
            contagem.textContent = `${lista.length} projetos exibidos: ${titulos.join(", ")}`;
        }
    };

    const filtrar = (categoria) => {
        const lista = projetos.filter((projeto) => projeto.categoria === categoria);
        mostrar(lista);
    };

    // Exibe todos inicialmente
    mostrar(projetos);

    /* ==========================================================
       CONFIGURAÇÃO DOS BOTÕES DE FILTRO
       ========================================================== */
    const botaoTodos = document.querySelector("#filtro-todos");
    const botaoPaginaSobreMim =
        document.querySelector("#filtro-pagina-sobre-mim") ||
        document.querySelector("#filtro-página-sobre-mim");
    const botaoFigma = document.querySelector("#filtro-figma");
    const botaoLampada = document.querySelector("#filtro-lampada");
    const botaoCalculadora = document.querySelector("#filtro-calculadora");

    if (botaoTodos) botaoTodos.addEventListener("click", () => mostrar(projetos));
    if (botaoPaginaSobreMim) {
        botaoPaginaSobreMim.addEventListener("click", () => filtrar("pagina-sobre-mim"));
    }
    if (botaoFigma) botaoFigma.addEventListener("click", () => filtrar("figma"));
    if (botaoLampada) botaoLampada.addEventListener("click", () => filtrar("lampada"));
    if (botaoCalculadora) botaoCalculadora.addEventListener("click", () => filtrar("calculadora"));
});