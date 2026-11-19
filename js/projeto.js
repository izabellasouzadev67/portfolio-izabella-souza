/* ==========================================================
   GERENCIAMENTO DE PROJETOS E FILTROS DINÂMICOS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const listaProjetos = document.querySelector("#lista-projetos");
    const contagem = document.querySelector("#contagem");
    let todos = [];

    const projetosLocais = [
        {
            titulo: "Protótipos do Figma",
            descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio.",
            categoria: "figma",
            link: "https://www.figma.com"
        },
        {
            titulo: "Página Sobre Mim",
            descricao: "Minha primeira página desenvolvida em HTML, CSS e JavaScript.",
            categoria: "pagina-sobre-mim",
            link: "sobre.html"
        },
        {
            titulo: "Lâmpada Interativa",
            descricao: "Mini projeto utilizando HTML, CSS puro e JavaScript.",
            categoria: "lampada",
            link: "https://github.com/izabellasouzadev67/lampada"
        },
        {
            titulo: "Calculadora Básica",
            descricao: "Mini projeto de calculadora básica em Front-End.",
            categoria: "calculadora",
            link: "https://github.com/izabellasouzadev67/calculadora"
        }
    ];

    function criarCard(projeto) {
        if (!listaProjetos) return;

        const card = document.createElement("section");
        card.classList.add("card-projeto");

        const iconeDiv = document.createElement("div");
        iconeDiv.classList.add("projeto-icone");
        iconeDiv.innerHTML = '<i class="fa-solid fa-code"></i>';

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("projeto-info");

        const tituloEl = document.createElement("h2");
        tituloEl.textContent = projeto.titulo || projeto.título;

        const textoEl = document.createElement("p");
        textoEl.textContent = projeto.descricao;

        infoDiv.appendChild(tituloEl);
        infoDiv.appendChild(textoEl);

        if (projeto.link) {
            const link = document.createElement("a");
            link.href = projeto.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "btn-projeto";
            link.innerHTML = 'Ver Projeto <i class="fa-solid fa-arrow-right"></i>';
            infoDiv.appendChild(link);
        }

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
            const titulos = lista.map((projeto) => projeto.titulo || projeto.título);
            contagem.textContent = `${lista.length} projetos exibidos: ${titulos.join(", ")}`;
        }
    };

    const filtrar = (categoria) => {
        const lista = todos.filter((projeto) => projeto.categoria === categoria);
        mostrar(lista);
    };

    fetch("projeto.json")
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
       CONFIGURAÇÃO DOS BOTÕES DE FILTRO
       ========================================================== */
    const botaoTodos = document.querySelector("#filtro-todos");
    const botaoPaginaSobreMim = document.querySelector("#filtro-pagina-sobre-mim") || document.querySelector("#filtro-página-sobre-mim");
    const botaoFigma = document.querySelector("#filtro-figma");
    const botaoLampada = document.querySelector("#filtro-lampada");
    const botaoCalculadora = document.querySelector("#filtro-calculadora");

    if (botaoTodos) botaoTodos.addEventListener("click", () => mostrar(todos));
    if (botaoPaginaSobreMim) {
        botaoPaginaSobreMim.addEventListener("click", () => {
            const filtrados = todos.filter(
                (p) => p.categoria === "pagina-sobre-mim" || p.categoria === "página-sobre-mim"
            );
            mostrar(filtrados);
        });
    }
    if (botaoFigma) botaoFigma.addEventListener("click", () => filtrar("figma"));
    if (botaoLampada) botaoLampada.addEventListener("click", () => filtrar("lampada"));
    if (botaoCalculadora) botaoCalculadora.addEventListener("click", () => filtrar("calculadora"));
});